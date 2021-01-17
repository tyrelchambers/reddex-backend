const express = require("express");
const db = require("../../models");

const app = express.Router();

app.get("/", async (req, res, next) => {
  try {
    const channels = await db.models.website.findAll();

    channels.map((x) => x.dataValues);

    res.send(channels);
  } catch (error) {
    next(error);
  }
});

module.exports = app;
