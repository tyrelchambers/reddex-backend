import express from 'express'
import {authHandler} from '../../middleware/middleware'
import SubmittedStories from '../../db/Models/SubmittedStories'

const app = express.Router();

app.get('/', authHandler, async (req, res, next) => {
  try {
    const stories = await SubmittedStories.findAll({
      where: {
        user_id: res.locals.userId
      }
    })
    
    stories.map(x => x.dataValues)

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

    await SubmittedStories.destroy({
      where: {
        uuid
      }
    })
    
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
    const story = await SubmittedStories.findOne({
      where: {
        uuid
      }
    }).then(res => res.dataValues)

    res.send(story)

  } catch (error) {
    next(error)
  }
})

module.exports = app;