import express from 'express'
import knex from '../../db/index'

const app = express.Router();

app.get('/', async (req, res, next) => {
  try {
    const channels = await knex('websites');
    res.send(channels)
  } catch (error) {
    next(error)
  }
})

module.exports = app;