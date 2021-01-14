const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("../../config");
const User = require("../../db/Models/User");

const app = express.Router();

app.post("/login", async (req, res, next) => {
  try {
    const password = req.sanitize(req.body.password);
    const email = req.sanitize(req.body.email);
    if (!password || !email) throw new Error("Missing email or password");

    const user = await User.findOne({
      where: {
        email: email,
      },
    }).then((res) => {
      if (res) {
        return res.dataValues;
      }
    });

    console.log(user);

    if (!user) throw new Error("User does not exist");

    const hashPassword = await bcrypt.compareSync(password, user.password);
    if (!hashPassword) throw new Error("Incorrect password");
    const token = jwt.sign(
      { uuid: user.uuid, email: user.email },
      config.development.secret,
      {
        expiresIn: "1d",
      }
    );

    res.send({
      token,
      user,
    });
  } catch (err) {
    next(err);
  }
});

module.exports = app;
