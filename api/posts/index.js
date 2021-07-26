const express = require("express");
const Post = require("../../db/Models/PostMongoose");
const jwt = require("jsonwebtoken");
const config = require("../../config");
const app = express.Router();

const avgReadingTime = (text) => {
  const wordsPerMinute = 200; // Average case.
  let result;

  let textLength = text.split(" ").length; // Split by words
  if (textLength > 0) {
    let value = Math.ceil(textLength / wordsPerMinute);
    result = value;
  }

  return result;
};

app.delete("/delete", async (req, res, next) => {
  try {
    await Post.deleteMany({
      visitor_token: req.headers.visitortoken,
    });

    res.sendStatus(200);
  } catch (err) {
    next(err);
  }
});

app.post("/save", async (req, res, next) => {
  try {
    jwt.verify(req.headers.token, config.development.secret, (err, decoded) => {
      if (err) throw new Error("Visitor token invalid");
      return true;
    });

    const toInsert = req.body.map((x) => ({
      author: x.author,
      title: x.title,
      self_text: x.self_text,
      ups: x.ups,
      url: x.url,
      num_comments: x.num_comments,
      created: x.created,
      link_flair_text: x.link_flair_text,
      post_id: x.post_id,
      subreddit: x.subreddit,
      upvote_ratio: x.upvote_ratio.toFixed(2),
      visitor_token: req.headers.visitortoken,
      readTime: avgReadingTime(x.self_text),
    }));

    const posts = await Post.create(toInsert);

    res.send(posts);
  } catch (error) {
    next(error);
  }
});

app.get("/", async (req, res, next) => {
  try {
    const {
      operator,
      upvotes,
      keywords,
      seriesOnly,
      excludeSeries,
      readTime,
      readTimeOperator,
    } = req.query;

    jwt.verify(
      req.headers.visitortoken,
      config.development.secret,
      (err, decoded) => {
        if (err) throw new Error("Visitor token invalid");
        return true;
      }
    );

    let resLimit = 25;
    let page = req.query.page || 1;

    const query = {
      visitor_token: req.headers.visitortoken,
    };

    if (upvotes > 0) {
      if (operator === ">") {
        query.ups = {
          $gte: Number(upvotes),
        };
      }

      if (operator === "=") {
        query.ups = {
          $eq: Number(upvotes),
        };
      }

      if (operator === "<") {
        query.ups = {
          $lte: Number(upvotes),
        };
      }
    }

    if (readTime > 0) {
      if (readTimeOperator === ">") {
        query.readTime = {
          $gte: Number(readTime),
        };
      }

      if (readTimeOperator === "<") {
        query.readTime = {
          $lte: Number(readTime),
        };
      }
    }

    if (keywords) {
      query.$text = {
        $search: `\"${keywords}\"`,
        $caseSensitive: false,
      };
    }

    if (seriesOnly) {
      query.link_flair_text = "Series";
    }

    if (excludeSeries) {
      query.link_flair_text = {
        $ne: "Series",
      };
    }

    const posts = await Post.find(query, null, {
      limit: resLimit,
      skip: resLimit * page - resLimit,
    });

    const count = await Post.count(query);

    res.send({
      posts,
      maxPages: Math.round(count / resLimit),
    });
  } catch (error) {
    next(error);
  }
});

app.put("/update", async (req, res, next) => {
  try {
    const { post_id } = req.body;

    await Post.findOneAndUpdate(
      {
        post_id,
      },
      {
        viewed: true,
      }
    );

    res.sendStatus(200);
  } catch (error) {
    next(error);
  }
});

module.exports = app;
