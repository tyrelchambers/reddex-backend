import express from 'express'
import knex from '../../db/index'
import {authHandler} from '../../middleware/middleware'

const app = express.Router();

app.post('/save', authHandler, async (req, res, next) => {
  try {
    const {
      tags,
      story_id
    } = req.body;

    const tagsToInsert = tags.map(x => ({
      story_uuid: story_id,
      tag_uuid: x,
      user_id: res.locals.userId
    }))
    
    await knex("tag_story").insert(tagsToInsert)

    res.sendStatus(200);

  } catch (error) {
    next(error);
  }
})

app.get('/', authHandler, async (req, res, next) => {
  try {
    // const tags = await knex.raw(`
    //   SELECT 
    //     tag,
    //     story_uuid,
    //     tag_uuid
    //   FROM tag_story t_s  CROSS JOIN
    //   tags t
    //   USING (user_id)
    //   WHERE user_id='${res.locals.userId}'
    //   GROUP BY story_uuid, t.tag, t_s.tag_uuid;
    // `)

    const tags = await knex.select(`tags.*`, knex.ref("stories.user_id").as("StoriesUserId"))
        .from('tag_story')
        .leftJoin('tags', `tag_uuid`, `tags.uuid`)
        .leftJoin('stories', `story_uuid`, `stories.uuid`)
        .where({
          user_id: res.locals.userId
        }).then(rows => {
          console.log(rows)
        })
    res.send(tags)
  } catch (error) {
    next(error)
  }
})

app.delete('/', authHandler, async (req, res, next) => {
  try {
    const {
      tag_uuid,
      story_uuid
    } = req.params;

    if (tag_uuid) {
      await knex("tag_story").where({
        tag_uuid
      }).del()

      res.sendStatus(200)
    }

    if (story_uuid) {
      await knex("tag_story").where({
        story_uuid
      }).del()

      res.sendStatus(200)
    }


  } catch (error) {
    next(error)
  }
})


module.exports = app;