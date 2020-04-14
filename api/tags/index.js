import express from 'express'
import knex from '../../db/index'
import {authHandler} from '../../middleware/middleware'
import uuidv4 from 'uuid'

const app = express.Router()

app.post('/save', authHandler, async (req, res, next) => {
  try {
    const {
      tag
    } = req.body;

    const existingTag = await knex('tags').where({
      tag: tag.toLowerCase(),
      user_id: res.locals.userId
    })

    if(existingTag.length > 0) throw new Error("Tag already exists")

    await knex("tags").insert({
      uuid: uuidv4(),
      tag,
      user_id: res.locals.userId
    })

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

app.get('/tag', authHandler, async (req, res, next) => {
  try {
    const {
      tag
    } = req.query;

    const tags = await knex("tags").where({
      user_id: res.locals.userId
    }).where('tag', 'like', `%${tag}%`)
    
    res.send(tags)

  } catch (error) {
    next(error)
  }
})

module.exports = app;