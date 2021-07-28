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
      visitor_token: req.headers.token,
    });

    res.sendStatus(200);
  } catch (err) {
    next(err);
  }
});

app.post("/save", async (req, res, next) => {
  try {
    const {subreddit} = req.body
    jwt.verify(req.headers.token, config.development.secret, (err, decoded) => {
      if (err) throw new Error("Visitor token invalid");
      return true;
    });

    const toInsert = req.body.posts.map((x) => ({
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
      readTime: avgReadingTime(x.self_text),
    }));


    const posts = await Post.create({posts: toInsert, subreddit, visitor_token: req.headers.token});

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

    jwt.verify(req.headers.token, config.development.secret, (err, decoded) => {
      if (err) throw new Error("Visitor token invalid");
      return true;
    });

    let resLimit = 25;
    let page = req.query.page || 1;

    const query = {
      visitor_token: req.headers.token,
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

    const post = await Post.findOne(query, null, {
      limit: resLimit,
      skip: resLimit * page - resLimit,
    });

    const count = await Post.count(query);

    res.send({
      post,
      maxPages: Math.round(count / resLimit),
    });
  } catch (error) {
    next(error);
  }
});

app.put("/update", async (req, res, next) => {
  try {
    const { post_id } = req.body;
  
    const postOwner = await Post.findOne({
      visitor_token: req.headers.token
    })

    const post = postOwner.posts.filter(p => p.post_id === post_id)[0]

    post.viewed = true

    await postOwner.save()

    res.sendStatus(200);
  } catch (error) {
    next(error);
  }
});

module.exports = app;
