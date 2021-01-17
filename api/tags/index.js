const express = require("express");
const { authHandler } = require("../../middleware/middleware");
const { Op } = require("sequelize");
const db = require("../../models");
const app = express.Router();

app.post("/save", authHandler, async (req, res, next) => {
  try {
    const { tag } = req.body;

    const existingTag = await db.models.tags
      .findOne({
        where: {
          tag: tag.toLowerCase(),
          user_id: res.locals.userId,
        },
      })
      .then((res) => {
        if (res) {
          return res.dataValues;
        }
      });

    if (existingTag) throw new Error("Tag already exists");

    const newTag = await db.models.tags.create(
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
    const tags = await db.models.tags.findAll({
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

    await db.models.tags.destroy({
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

    const tags = await db.models.tags
      .findAll({
        where: {
          user_id: res.locals.userId,
          tag: {
            [Op.substring]: `%${tag}%`,
          },
        },
      })
      .then((x) => x.map((x) => x.dataValues));

    res.send(tags);
  } catch (error) {
    next(error);
  }
});

app.get("/:story_id/available", authHandler, async (req, res, next) => {
  try {
    const { story_id } = req.params;

    const tags = await db.models.tags
      .findAll({
        where: {
          user_id: res.locals.userId,
        },
      })
      .then((x) => x.map((x) => x.dataValues.uuid));

    const storyTags = await db.models.stories
      .findOne({
        where: {
          uuid: story_id,
        },
        include: db.models.tags,
      })
      .then((x) => x.dataValues.tags.map((x) => x.dataValues.uuid));

    const available = tags.filter((x) => !storyTags.includes(x));

    const availableTags = await db.models.tags
      .findAll({
        where: {
          uuid: [...available],
        },
      })
      .then((x) => x.map((x) => x.dataValues));

    res.send(availableTags);
  } catch (error) {
    next(error);
  }
});

module.exports = app;
