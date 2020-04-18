import express from 'express'

import {authHandler} from '../../middleware/middleware'

const app = express.Router();

app.get('/', authHandler, async (req, res, next) => {
  try {
    const stories = await knex("submitted_stories").where({
      user_id: res.locals.userId
    }).returning('*')

    res.send(stories)
  } catch (error) {
    next(error)
  }
})

app.delete('/delete', authHandler, async (req, res, next) => {
  try {
    const {
      uuid
    } = req.query;

    await knex('submitted_stories').where({
      uuid
    }).del()
    
    res.send("Story deleted")
  } catch (error) {
    next(error)
  }
})

app.get('/:id', authHandler, async (req, res, next) => {
  try {
    const {
      id
    } = req.params;

    const uuid = new URLSearchParams(id).get('id')
    const story = await knex('submitted_stories').where({
      uuid
    })

    res.send(story[0])

  } catch (error) {
    next(error)
  }
})

module.exports = app;