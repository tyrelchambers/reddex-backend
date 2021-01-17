const express = require("express");
const jwt = require("jsonwebtoken");
const emailCon = require("../../libs/emailConfig");
const config = require("../../config");
const bcrypt = require("bcryptjs");
const db = require("../../models");

const app = express.Router();

app.post("/get_reset_token", async (req, res, next) => {
  try {
    const email = req.sanitize(req.body.email);

    const user = await db.models.user
      .findOne({
        where: {
          email,
        },
      })
      .then((res) => {
        if (res) {
          return res.dataValues;
        }
      });

    if (!user) throw new Error("No user exists with that email");

    const resetToken = jwt.sign(
      { uuid: user.uuid, email: user.email },
      config.development.secret,
      {
        expiresIn: "1d",
      }
    );

    emailCon
      .send({
        template: "resetPassword",
        message: {
          to: user.email,
        },
        locals: {
          resetToken,
        },
      })
      .then()
      .catch(console.error);
  } catch (err) {
    next(err);
  }
});

app.post("/", async (req, res, next) => {
  try {
    const { password, code } = req.body;

    const userId = await jwt.verify(
      code,
      config[config.env].secret,
      (err, decoded) => {
        if (err) throw new Error(err);
        return decoded.uuid;
      }
    );

    if (!password) throw new Error("No password provided");

    const hashNewPassword = await bcrypt.hashSync(password, 10);

    await User.update(
      {
        password: hashNewPassword,
      },
      {
        uuid: userId,
      }
    );

    res.send("Password changed successfully");
  } catch (err) {
    next(err);
  }
});

module.exports = app;
