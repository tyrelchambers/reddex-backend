import express from 'express';
import { authHandler } from '../../middleware/middleware';
import knex from '../../db/index'
import User from '../../db/Models/User'

const app = express.Router();

app.get('/getTokens', authHandler, async (req, res, next) => {
  try {
    const userId = res.locals.userId;
    const user = await User.findOne({
      where: {
        uuid: userId
      },
      attributes: ['refresh_token', 'access_token']
    }).then(res => res.dataValues)
      
    if (!user) throw new Error("No user");
    
    console.log(user.dataValues)

    res.json({
      refresh_token: user.refresh_token,
      access_token: user.access_token
    })
  }

  catch(err) {
    next(err)

  }
});

app.post('/saveTokens', authHandler, async (req ,res) => {
  try {
    const userId = res.locals.userId;
    const access_token = req.sanitize(req.body.access_token);
    const refresh_token = req.sanitize(req.body.refresh_token);

    await knex('users').where({uuid: userId}).update({
      access_token,
      refresh_token
    })
    
    res.sendStatus(200);
  }

  catch(err) {
    next(err)

  }
});


module.exports = app;