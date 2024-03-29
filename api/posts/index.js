const express = require("express");
const Post = require("../../db/Models/PostMongoose");
const jwt = require("jsonwebtoken");
const { avgReadingTime } = require("../../libs/avgReadingTime");
const filterByUpvotes = require("../../libs/filterByUpvotes");
const filterByReadTime = require("../../libs/filterByReadTime");
const filterBySeries = require("../../libs/filterBySeriesOnly");
const filterByKeywords = require("../../libs/filterByKeywords");
const { visitorHandler } = require("../../middleware/middleware");
const app = express.Router();



app.delete("/delete", visitorHandler, async (req, res, next) => {
  try {
    await Post.deleteMany({
      visitor_token: res.locals.temptoken,
    });

    res.sendStatus(200);
  } catch (err) {
    next(err);
  }
});

app.post("/save", visitorHandler, async (req, res, next) => {
  try {
    const {subreddit} = req.body
    

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


    const posts = await Post.create({posts: toInsert, subreddit, visitor_token: res.locals.temptoken});

    res.send(posts);
  } catch (error) {
    next(error);
  }
});

app.get("/", visitorHandler, async (req, res, next) => {
  try {
    const {
      operator,
      upvotes,
      keywords,
      seriesOnly,
      omitSeries,
      readTime,
      readTimeOperator,
    } = req.query;

    let resLimit = 25;
    let page = req.query.page || 1;
    const limit = resLimit * page;
    const skip = resLimit * page - resLimit;
    let query = {};

    if (upvotes > 0) {
      if (operator === ">") {
        query.ups = {
          operator: "gte",
          value: Number(upvotes),
        };
      }

      if (operator === "=") {
        query.ups = {
          operator: "eq",
          value: Number(upvotes),
        };
      }

      if (operator === "<") {
        query.ups = {
          operator: "lte",
          value: Number(upvotes),
        };
      }
    }

    if (readTime > 0) {      
      if (readTimeOperator === ">") {
        query.readTime = {
          operator: "gte",
          value: Number(readTime),
        };
      }

      if (readTimeOperator === "<") {
        query.readTime = {
          operator: "lte",
          value: Number(readTime),
        };
      }
    }

    if (keywords) {
      query.keywords = `${keywords}`;
    }

    if (seriesOnly === 'true') {
      query.seriesOnly = true;
    }

    if (omitSeries === 'true') {
      query.omitSeries = true
    }


    const postOwner = await Post.findOne({visitor_token: res.locals.temptoken})
    const posts = postOwner === null ? [] : postOwner.posts
                    .filter(post => filterByUpvotes({post, query}))
                    .filter(post => filterByReadTime({post, query}))
                    .filter(post => filterByKeywords({post, query}))
                    .filter(post => filterBySeries({post, query}))
                    
    res.send({
      post: {
        subreddit: postOwner?.subreddit,
        posts: posts.slice(skip, limit)
      },
      maxPages: postOwner ? Math.round(posts.length / 25) : 0,
    });
  } catch (error) {
    next(error);
  }
});

app.put("/update", visitorHandler, async (req, res, next) => {
  try {
    const { post_id } = req.body;
  
    const postOwner = await Post.findOne({
      visitor_token: res.locals.temptoken
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
