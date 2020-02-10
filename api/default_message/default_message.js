import express from 'express'
import { authHandler } from '../../middleware/middleware'
import knex from '../../db/index'
const app = express.Router();

app.get('/', authHandler, async (req, res,next) => {
  try {
    const userId = res.locals.userId;

    const message = await knex('users').where({
      uuid: userId
    }).returning('*')

    res.send(message);
  } catch (err) {
    next(err)
  }
})

app.post('/', authHandler, async (req, res, next) => {
  try {
    const userId = res.locals.userId;
    const text = req.sanitize(req.body.text);

    const message = await knex('users').where({
      uuid: userId
    })
    .update({
      initial_message: text
    }).returning('*')
    
    res.send(message);
  }

  catch(err) {
    next(err)
  }
});


module.exports = app;