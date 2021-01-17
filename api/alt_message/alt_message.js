const express = require("express");
const { authHandler } = require("../../middleware/middleware");
const db = require("../../models");

const app = express.Router();

app.post("/", authHandler, async (req, res, next) => {
  try {
    const userId = res.locals.userId;
    const text = req.sanitize(req.body.text);

    await db.models.user.update(
      {
        repeat_message: text,
      },
      {
        where: {
          uuid: userId,
        },
      }
    );

    res.sendStatus(200);
  } catch (err) {
    next(err);
  }
});

app.get("/", authHandler, async (req, res, next) => {
  try {
    const userId = res.locals.userId;

    const message = await db.models.user
      .findOne(
        {
          where: {
            uuid: userId,
          },
        },
        {
          attributes: ["repeat_message"],
        }
      )
      .then((res) => res.dataValues);

    res.send(message);
  } catch (err) {
    next(err);
  }
});

module.exports = app;
