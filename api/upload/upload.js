const express = require("express");
const { authHandler } = require("../../middleware/middleware");
const { upload, deleteObject } = require("../../libs/aws");

const anyUpload = upload.any();

const app = express.Router();

app.post("/save", authHandler, (req, res, next) => {
  anyUpload(req, res, (err) => {
    if (err) {
      return res.status(422).send({
        errors: [{ title: "Image Upload Error", detail: err.message }],
      });
    }
    for (let i = 0; i < req.files.length; i++) {
      res.send({
        original: req.files[0].transforms[1].location,
        thumbnail: req.files[0].transforms[0].location,
      });
    }
  });
});

app.delete("/revert", authHandler, async (req, res, next) => {
  try {
    const { url } = req.query;
    await deleteObject(url);

    res.sendStatus(200);
  } catch (err) {
    next(err);
  }
});

module.exports = app;
