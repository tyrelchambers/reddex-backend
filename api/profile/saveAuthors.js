const express = require("express");
const { authHandler } = require("../../middleware/middleware");
const db = require("../../models");

const app = express.Router();

app.post("/saveAuthors", authHandler, async (req, res, next) => {
  try {
    const { userId } = res.locals;
    const name = req.sanitize(req.body.name);
    const post_id = req.sanitize(req.body.post_id);

    await db.models.authors_messaged.create({
      name,
      user_id: userId,
    });

    await db.models.stories_used.create({
      post_id,
      user_id: userId,
    });

    res.sendStatus(200);
  } catch (err) {
    next(err);
  }
});

app.get("/authors_messaged", authHandler, async (req, res, next) => {
  try {
    const userId = res.locals.userId;
    const authors = await db.models.author_messaged.findAll({
      where: {
        user_id: userId,
      },
    });
    authors.map((x) => x.dataValues);

    res.send(authors);
  } catch (err) {
    next(err);
  }
});

module.exports = app;
