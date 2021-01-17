const express = require("express");
const Website = require("../../db/Models/Website");

const app = express.Router();

app.get("/", async (req, res, next) => {
  try {
    const channels = await Website.findAll();

    channels.map((x) => x.dataValues);

    res.send(channels);
  } catch (error) {
    next(error);
  }
});

module.exports = app;
