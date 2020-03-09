import express from 'express'
import {authHandler} from '../../middleware/middleware'
import knex from '../../db/index'

const app = express.Router();

app.get('/', authHandler, async (req, res, next) => {
  try {
    const terms = await knex("recently_searched").where({user_id: res.locals.userId})
    res.send(terms)
  } catch (error) {
    next(error)
  }
})

app.post('/', authHandler, async (req, res, next) => {
  try {
    const {
      subreddit
    } = req.body;
    
    if (!subreddit) throw new Error("No subreddit given")
    
    const existing = await knex("recently_searched").where({subreddit, user_id: res.locals.userId})

    if ( existing.length === 0) {
      const term = await knex("recently_searched").insert({
        subreddit,
        count: 1,
        user_id: res.locals.userId
      }).returning("*")

      return res.send(term)
    } else {
      const term = await knex("recently_searched").where({
        subreddit,
        user_id: res.locals.userId
      })
      .increment({
        count: 1
      })
      .returning('*')

      return res.send(term)
    }

  } catch (error) {
    next(error)
  }
})

module.exports = app;