const express = require("express");
const { authHandler } = require("../../middleware/middleware");
const TagStory = require("../../db/Models/TagStory");
const Tag = require("../../db/Models/Tag");
const Story = require("../../db/Models/Story");

const app = express.Router();

app.post("/save", authHandler, async (req, res, next) => {
  try {
    const { tags, story_uuid } = req.body;

    const tagsToInsert = tags.map((x) => ({
      story_id: story_uuid,
      tag_id: x.uuid,
    }));

    await TagStory.bulkCreate(tagsToInsert);

    res.sendStatus(200);
  } catch (error) {
    next(error);
  }
});

app.delete("/remove", authHandler, async (req, res, next) => {
  try {
    const { tag } = req.body;

    await TagStory.destroy({
      where: {
        uuid: tag.TagStory.uuid,
      },
    });

    res.sendStatus(200);
  } catch (error) {
    next(error);
  }
});

app.get("/", authHandler, async (req, res, next) => {
  try {
    const tagsInUse = await Tag.findAll({
      where: {
        user_id: res.locals.userId,
      },
      include: Story,
    }).then((res) => res.filter((x) => x.Stories.length > 0));

    res.send(tagsInUse);
  } catch (error) {
    next(error);
  }
});
module.exports = app;
