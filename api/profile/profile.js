const express = require("express");
const { authHandler } = require("../../middleware/middleware");
const bcrypt = require("bcryptjs");

const User = require("../../db/Models/User");
const StoriesUsed = require("../../db/Models/StoriesUsed");
const Story = require("../../db/Models/Story");

const app = express.Router();

app.get("/auth", authHandler, async (req, res, next) => {
  try {
    const userId = res.locals.userId;
    const user = await User.findOne({
      where: {
        uuid: userId,
      },
    }).then((res) => {
      if (res) {
        return res.dataValues;
      }
    });

    res.send(user);
  } catch (err) {
    next(err);
  }
});

app.post("/youtube", authHandler, async (req, res, next) => {
  try {
    const youtube_id = req.sanitize(req.body.youtube_id);

    await User.update(
      {
        youtube_id,
      },
      {
        where: {
          uuid: res.locals.userId,
        },
      }
    );

    res.sendStatus(200);
  } catch (err) {
    next(err);
  }
});

app.put("/update/email", authHandler, async (req, res, next) => {
  try {
    const email = req.sanitize(req.body.email);

    if (!email) throw new Error("No email provided");

    const user = User.update(
      {
        email,
      },
      {
        where: {
          uuid: res.locals.userId,
        },
      }
    );

    res.send(user);
  } catch (err) {
    next(
      err.code === "23505" ? "Email already exists" : `Error code: ${err.code}`
    );
  }
});

app.put("/update/password", authHandler, async (req, res, next) => {
  try {
    const newPassword = req.sanitize(req.body.newPassword);
    const currentPassword = req.sanitize(req.body.currentPassword);

    if (!newPassword || !currentPassword)
      throw new Error("No passwords provided");

    const user = await User.findOne({
      where: {
        uuid: res.locals.userId,
      },
    }).then((res) => {
      if (res) {
        return res.dataValues;
      }
    });

    const comparePasswords = await bcrypt.compareSync(
      currentPassword,
      user.password
    );

    if (!comparePasswords) throw new Error("Passwords don't match");

    const hashNewPassword = await bcrypt.hashSync(newPassword, 10);

    await User.update(
      {
        password: hashNewPassword,
      },
      {
        where: {
          uuid: res.locals.userId,
        },
      }
    );

    res.sendStatus(200);
  } catch (err) {
    next(err);
  }
});

app.delete("/delete", authHandler, async (req, res, next) => {
  try {
    const uuid = req.sanitize(req.query.uuid);

    if (uuid !== res.locals.userId) throw new Error("Something went wrong");

    await User.destroy({
      where: {
        uuid,
      },
    });

    res.send(200);
  } catch (err) {
    next(err);
  }
});

app.get("/stories_used", authHandler, async (req, res, next) => {
  try {
    const id = res.locals.userId;
    const stories = await Story.findAll({
      where: {
        user_id: id,
      },
    });

    stories.map((x) => x.dataValues);

    res.send(stories);
  } catch (err) {
    next(err);
  }
});

app.post("/reddit_profile", authHandler, async (req, res, next) => {
  try {
    const reddit_profile = req.body;
    const user = await User.update(
      {
        reddit_profile,
      },
      {
        where: {
          uuid: res.locals.userId,
        },
      }
    );

    res.send(user);
  } catch (err) {
    next(err);
  }
});

app.get("/patreon_tier", async (req, res) => {
  try {
    const { user_id } = req.query;

    const tier = await User.findOne({
      where: {
        uuid: user_id,
      },
      attributes: ["patreon_tier"],
    }).then((res) => {
      if (res) {
        return res.dataValues;
      }
    });

    res.send(tier);
  } catch (error) {}
});

module.exports = app;
