import express from "express"
import { authHandler } from '../../middleware/middleware'


const app = express.Router();

app.post('/', authHandler, async (req, res, next) => {
  try {
    const userId = res.locals.userId;
    const text = req.sanitize(req.body.text);

    const message = await knex('users').where({
      uuid: userId
    })
    .update({
      repeat_message: text
    }).returning('repeat_message')
    
    res.send(message);
  }

  catch(err) {
    next(err)
  }
});

app.get('/', authHandler, async (req, res, next) => {
  try {
    const userId = res.locals.userId;

    const message = await knex('users').where({
      uuid: userId
    }).returning('repeat_message')

    res.send(message);
  } catch (err) {
    next(err)
  }
})


module.exports = app;