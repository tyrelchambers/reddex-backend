import express from 'express'
import knex from '../../db/index'
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

module.exports = app;