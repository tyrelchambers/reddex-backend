import express from 'express';
import { authHandler } from '../../middleware/middleware';
import knex from '../../db/index'

const app = express.Router();

app.get('/getTokens', authHandler, async (req, res) => {
  try {
    const userId = res.locals.userId;
    const user = await knex('users').where({uuid: userId}).returning(['refresh_token', 'access_token'])
  
    if (!user) throw new Error("No user");

    res.json({
      refresh_token: user[0].refresh_token,
      access_token: user[0].access_token
    })
  }

  catch(err) {
    console.log(err);
    res.status(503).send(err);
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
    console.log(err);
    res.status(400).send(err);
  }
});


module.exports = app;