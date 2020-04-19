import express from 'express'
import {authHandler} from '../../middleware/middleware'
import Tag from '../../db/Models/Tag'
import {Op} from 'sequelize'

const app = express.Router()

app.post('/save', authHandler, async (req, res, next) => {
  try {
    const {
      tag
    } = req.body;

    const existingTag = await Tag.findOne({
      where: {
        tag: tag.toLowerCase(),
        user_id: res.locals.userId
      }
    })

    if(existingTag) throw new Error("Tag already exists")

    await Tag.create({
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
    const tags = await Tag.findAll({
      where: {
        user_id: res.locals.userId
      }
    })

    tags.map(x => x.dataValues)

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

    await Tag.destroy({
      where: {
        uuid: id
      }
    })

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

    const tags = await Tag.findAll({
      where: {
        user_id: res.locals.userId,
        tag: {
          [Op.substring]: `%${tag}%`
        }
      }
    })

    tags.map(x => x.dataValues)

    res.send(tags)

  } catch (error) {
    next(error)
  }
})

module.exports = app;