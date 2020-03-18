import express from 'express';
import {authHandler} from '../../middleware/middleware'
import knex from '../../db/index'

import Axios from 'axios';

const app = express.Router();

app.post('/getTokens', authHandler, async (req, res, next) => {
  try {
    const {
      code
    } = req.body;

    const tokens = await Axios.post(`https://www.patreon.com/api/oauth2/token?code=${code}&grant_type=authorization_code&client_id=${process.env.PATREON_ID}&client_secret=${process.env.PATREON_SECRET}&redirect_uri=http://localhost:3000/dashboard/account?t=security`, {
      'Content-Type': 'application/x-www-form-urlencoded'
    })
    .then(res => res.data)
    .catch(err => console.log(err))

    const {
      access_token,
      expires_in,
      refresh_token
    } = tokens;

    await knex('users').where({
      uuid: res.locals.userId
    }).update({
      patreon_access_token: access_token,
      patreon_access_expire: expires_in,
      patreon_refresh_token: refresh_token,
      patreon_connected: true
    })
    
    res.send(access_token)

  } catch (error) {
    console.log(error)
    next(error)
  }
})

app.get('/identity', authHandler, async (req, res, next) => {
  try {
    const {
      access_token
    } = req.query;

    if (!access_token) throw new Error("No token provided")

    const campaignId = 4145490;
    const payload = {}
    let tier;

    const memberships = await Axios.get(`https://www.patreon.com/api/oauth2/v2/identity?include=memberships.campaign&fields${encodeURI('[user]')}=about,created,email&fields${encodeURI('[member]')}=patron_status,currently_entitled_amount_cents`, {
      headers: {
        'Authorization': `Bearer ${access_token}`,
        'Content-Type': 'application/x-www-form-urlencoded'

      }
    })
    .then(res => res.data)
    .catch(err => err)

    if (!memberships.included) {
      res.sendStatus(200);
    }

    for(let i = 0; i<memberships.included.length; i++) {
      for (let key in memberships.included[i]) {
        if (key === "relationships") {
          if (memberships.included[i].relationships.campaign.data.id == campaignId) {
            payload.payment = memberships.included[i].attributes.currently_entitled_amount_cents;
            payload.active_patron = memberships.included[i].attributes.patron_status
          }
        }
      }
    }

    if (payload.payment === 1000) {
      tier = "basic"
    }

    if (payload.payment === 2000) {
      tier = "pro"
    }

    await knex('users').where({
      uuid: res.locals.userId
    }).update({
      patreon_tier: tier,
      active_patron: payload.active_patron === "active_patron" ? true : false
    })

    res.send({
      active_patron: payload.active_patron,
      tier
    })
  } catch (error) {
    next(error)
  }
})

app.get('/getUserIdentity', authHandler, async (req, res, next) => {
  try {
    const user = await knex.where({uuid: res.locals.userId}).select('patreon_tier', 'active_patron', 'patreon_connected').from('users');
    res.send(user)
  } catch (error) {
    next(error)
  }
})

app.delete('/disconnect', authHandler, async (req,res,next) => {
  try {
    await knex('users').where({
      uuid: res.locals.userId
    }).update({
      patreon_tier: null,
      active_patron: null,
      patreon_access_token: null,
      patreon_access_expire: null,
      patreon_refresh_token: null,
      patreon_connected: false
    })

    res.sendStatus(200)
  } catch (error) {
    next(error)
  }
})
module.exports = app;