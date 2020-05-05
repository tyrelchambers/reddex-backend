import express from 'express'
import Post from '../../db/Models/PostMongoose'

const app = express.Router();

app.post('/save', async (req, res, next) => {
  try {
    const toInsert = req.body.map(x => ({
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
      upvote_ratio: Math.round(x.upvote_ratio),
      visitor_token: req.headers.visitortoken
    }))
    await Post.deleteMany({
      visitor_token: req.headers.visitortoken
    })

    const posts = await Post.create(toInsert)
    const results = posts.splice(0, 100);
    
    res.send(results)
  } catch (error) {
    next(error)
  }
})

app.get('/', async (req, res, next) => {
  try {
    const {
      operator,
      upvotes,
      keywords,
      seriesOnly,
      excludeSeries
    } = req.query;

    let resLimit = 100;
    let page = req.query.page || 1;

    const query = {
      visitor_token: req.headers.visitortoken,
    }

    if (upvotes > 0) {
      if (operator === ">") {
        query.ups = {
          $gt: Number(upvotes)
        }
      }

      if (operator === "=") {
        query.ups = {
          $eq: Number(upvotes)
        }
      }

      if (operator === "<") {
        query.ups = {
          $lt: Number(upvotes)
        }
      }
    }

    if (keywords) {
      query.$text = {
        $search: `\"${keywords}\"`,
        $caseSensitive: false,
      }
    }

    if (seriesOnly) {
      query.link_flair_text = "Series"
    }

    if (excludeSeries) {
      query.link_flair_text = {
        $ne: "Series"
      }

    }

    const posts = await Post.find(query,null, {
      limit: resLimit,
      skip: ((resLimit * page) - resLimit)
      
    })

    page++

    res.send({
      posts,
      nextPage: posts.length === 100 ? page : -1
    })
  } catch (error) {
    next(error)
  }
})

app.put('/update', async (req, res, next) => {
  try {
    const {
      post_id
    } = req.body;

    await Post.findOneAndUpdate({
      post_id
    }, {
      viewed: true
    })

    res.sendStatus(200)
  } catch (error) {
    next(error)
  }
})

module.exports = app