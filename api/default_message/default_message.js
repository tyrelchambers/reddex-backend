const express = require("express");
const { authHandler } = require("../../middleware/middleware");
const db = require("../../models");
const app = express.Router();

app.get("/", authHandler, async (req, res, next) => {
  try {
    const userId = res.locals.userId;

    const message = await db.models.user
      .findOne({
        where: {
          uuid: userId,
        },
      })
      .then((res) => {
        if (res) {
          return res.dataValues;
        }
      });

    res.send(message);
  } catch (err) {
    next(err);
  }
});

app.post("/", authHandler, async (req, res, next) => {
  try {
    const userId = res.locals.userId;
    const text = req.sanitize(req.body.text);

    await db.models.user.update(
      {
        initial_message: text,
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

module.exports = app;
