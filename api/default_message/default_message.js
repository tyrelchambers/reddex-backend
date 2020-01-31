import express from 'express'
import { authHandler } from '../../middleware/middleware'
import knex from '../../db/index'
import uuidv4 from 'uuid';
const app = express.Router();

app.get('/', authHandler, async (req, res) => {
  try {
    const userId = res.locals.userId;

    const message = await knex('users').where({
      uuid: userId
    }).returning('*')

    res.send(message);
  } catch (err) {
    console.log(err);
    res.send(400).json({error: err});
  }
})

app.post('/', authHandler, async (req, res) => {
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
    console.log(err);
    res.send(400).json({error: err});
  }
});

app.put('/', authHandler, async (req, res, next) => {
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
  } catch (error) {
    console.log(error)
    res.status(500).send(error.message)
    next(error)
  }
})

module.exports = app;