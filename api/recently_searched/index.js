const express = require("express");
const { authHandler } = require("../../middleware/middleware");
const RecentlySearched = require("../../db/Models/RecentlySearched");

const app = express.Router();

app.get("/", authHandler, async (req, res, next) => {
  try {
    const terms = await RecentlySearched.findAll({
      where: {
        user_id: res.locals.userId,
      },
    });

    terms.map((x) => x.dataValues);

    res.send(terms);
  } catch (error) {
    next(error);
  }
});

app.post("/", authHandler, async (req, res, next) => {
  try {
    const { subreddit } = req.body;

    if (!subreddit) throw new Error("No subreddit given");

    const term = await RecentlySearched.findOrCreate({
      where: {
        subreddit,
        user_id: res.locals.userId,
      },
    });

    return res.send(term);
  } catch (error) {
    next(error);
  }
});

module.exports = app;
