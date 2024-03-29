const express = require("express");
const { authHandler } = require("../../middleware/middleware");
const User = require("../../db/Models/User");
const jwt = require("jsonwebtoken");
const config = require("../../config");
const { v4: uuidv4 } = require('uuid');

const app = express.Router();

app.get("/getTokens", authHandler, async (req, res, next) => {
  try {
    const userId = res.locals.userId;
    const user = await User.findOne({
      where: {
        uuid: userId,
      },
      attributes: ["refresh_token", "access_token"],
    }).then((res) => {
      if (res) {
        return res.dataValues;
      }
    });

    if (!user) throw new Error("No user");

    res.json({
      refresh_token: user.refresh_token,
      access_token: user.access_token,
    });
  } catch (err) {
    next(err);
  }
});

app.post("/saveTokens", authHandler, async (req, res) => {
  try {
    const userId = res.locals.userId;
    const access_token = req.sanitize(req.body.access_token);
    const refresh_token = req.sanitize(req.body.refresh_token);

    await User.update(
      {
        access_token,
        refresh_token,
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

app.get("/visitorToken", async (req, res, next) => {
  try {
    const token = uuidv4()
    res.send(token);
  } catch (error) {
    next(error);
  }
});

module.exports = app;
