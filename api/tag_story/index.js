import express from 'express'
import {authHandler} from '../../middleware/middleware'
import TagStory from '../../db/Models/TagStory'

const app = express.Router();

app.post('/save', authHandler, async (req, res, next) => {
  try {
    const {
      tags,
      story_id
    } = req.body;

    const tagsToInsert = tags.map(x => ({
      story_id: story_id,
      tag_id: x,
    }))
    
    await TagStory.bulkCreate(tagsToInsert)
    
    res.sendStatus(200);

  } catch (error) {
    next(error);
  }
})

app.delete('/:tag_id', authHandler, async (req, res, next) => {
  try {
    const {
      tag_id
    } = req.params;

    await TagStory.destroy({
      where: {
        uuid: tag_id
      }
    })

    res.sendStatus(200)
    
  } catch (error) {
    next(error)
  }
})


module.exports = app;