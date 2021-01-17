const express = require("express");
const { authHandler } = require("../../middleware/middleware");
const Tag = require("../../db/Models/Tag");
const { Op } = require("sequelize");
const Story = require("../../db/Models/Story");
const app = express.Router();

app.post("/save", authHandler, async (req, res, next) => {
  try {
    const { tag } = req.body;

    const existingTag = await Tag.findOne({
      where: {
        tag: tag.toLowerCase(),
        user_id: res.locals.userId,
      },
    }).then((res) => {
      if (res) {
        return res.dataValues;
      }
    });

    if (existingTag) throw new Error("Tag already exists");

    const newTag = await Tag.create(
      {
        tag,
        user_id: res.locals.userId,
      },
      {
        returning: true,
      }
    );

    res.send(newTag.dataValues);
  } catch (error) {
    next(error);
  }
});

app.get("/", authHandler, async (req, res, next) => {
  try {
    const tags = await Tag.findAll({
      where: {
        user_id: res.locals.userId,
      },
    });

    tags.map((x) => x.dataValues);

    res.send(tags);
  } catch (error) {
    next(error);
  }
});

app.delete("/:id", authHandler, async (req, res, next) => {
  try {
    const { id } = req.params;

    await Tag.destroy({
      where: {
        uuid: id,
        user_id: res.locals.userId,
      },
    });

    res.sendStatus(200);
  } catch (error) {
    next(error);
  }
});

app.get("/tag", authHandler, async (req, res, next) => {
  try {
    const { tag } = req.query;

    const tags = await Tag.findAll({
      where: {
        user_id: res.locals.userId,
        tag: {
          [Op.substring]: `%${tag}%`,
        },
      },
    }).then((x) => x.map((x) => x.dataValues));

    res.send(tags);
  } catch (error) {
    next(error);
  }
});

app.get("/:story_id/available", authHandler, async (req, res, next) => {
  try {
    const { story_id } = req.params;

    const tags = await Tag.findAll({
      where: {
        user_id: res.locals.userId,
      },
    }).then((x) => x.map((x) => x.dataValues.uuid));

    const storyTags = await Story.findOne({
      where: {
        uuid: story_id,
      },
      include: Tag,
    }).then((x) => x.dataValues.Tags.map((x) => x.dataValues.uuid));

    const available = tags.filter((x) => !storyTags.includes(x));

    const availableTags = await Tag.findAll({
      where: {
        uuid: [...available],
      },
    }).then((x) => x.map((x) => x.dataValues));

    res.send(availableTags);
  } catch (error) {
    next(error);
  }
});

module.exports = app;
