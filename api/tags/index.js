import express from 'express'
import knex from '../../db/index'
import {authHandler} from '../../middleware/middleware'
import uuidv4 from 'uuid'

const app = express.Router()

app.post('/save', authHandler, async (req, res, next) => {
  try {
    const {
      story_id,
      tags
    } = req.body;

    const tagsToInsert = tags.map((x, id) => ({
      uuid: uuidv4(),
      tag: x,
      story_id,
      user_id: res.locals.userId
    }))

    await knex("tags").insert(tagsToInsert)

    res.sendStatus(200)
  } catch (error) {
    next(error)
  }
})

app.get('/', authHandler, async (req, res, next) => {
  try {
    const tags = await knex('tags').where({
      user_id: res.locals.userId
    })

    res.send(tags)
  } catch (error) {
    next(error)
  }
})

app.delete('/:id', authHandler, async (req, res, next) => {
  try {
    const {
      id
    } = req.params;

    await knex("tags").where({
      uuid: id
    }).del();

    res.sendStatus(200)
  } catch (error) {
    next(error)
  }
})

module.exports = app;