const express = require("express");
const { authHandler } = require("../../middleware/middleware");
const db = require("../../models");

const app = express.Router();

app.post("/save", authHandler, async (req, res, next) => {
  try {
    const { tags, story_uuid } = req.body;

    const tagsToInsert = tags.map((x) => ({
      story_id: story_uuid,
      tag_id: x.uuid,
    }));

    await db.models.tag_story.bulkCreate(tagsToInsert);

    res.sendStatus(200);
  } catch (error) {
    next(error);
  }
});

app.delete("/remove", authHandler, async (req, res, next) => {
  try {
    const { tag } = req.body;

    await db.models.tag_story.destroy({
      where: {
        uuid: tag.tag_story.uuid,
      },
    });

    res.sendStatus(200);
  } catch (error) {
    next(error);
  }
});

app.get("/", authHandler, async (req, res, next) => {
  try {
    const tagsInUse = await db.models.tags
      .findAll({
        where: {
          user_id: res.locals.userId,
        },
        include: db.models.stories,
      })
      .then((res) => res.filter((x) => x.stories.length > 0));

    res.send(tagsInUse);
  } catch (error) {
    next(error);
  }
});
module.exports = app;
