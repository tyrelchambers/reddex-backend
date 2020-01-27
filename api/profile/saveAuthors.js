import express from 'express';
import { authHandler } from '../../middleware/middleware';
import knex from '../../db/index'

const app = express.Router();

app.post('/saveAuthors', authHandler, async (req, res) => {
  try {
    const { userId } = res.locals;
    const name = req.sanitize(req.body.name);
    const post_id = req.sanitize(req.body.post_id);

    await knex('authors_messaged').insert({
      name,
      user_id: userId
    })

    await knex('stories_used').insert({
      post_id,
      user_id: userId
    })
    
    res.sendStatus(200);
  }

  catch(err) {
    console.log(err);
    res.status(500).json({err});
  }
});

app.get('/authors_messaged', authHandler, async (req, res) => {
  try {
    const userId = res.locals.userId;
    const authors = await knex('authors_messaged').where({
      user_id: userId
    }).returning('*')

    res.send(authors)
  }
  catch(err) {
    console.log(err);
    res.status(500).send(err.message);
    next(err)
  }
})

module.exports = app;