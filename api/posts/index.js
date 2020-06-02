import express from 'express'
import Post from '../../db/Models/PostMongoose'
import jwt from 'jsonwebtoken';
import config from '../../config'
const app = express.Router();

const avgReadingTime = (text) => {

  const wordsPerMinute = 200; // Average case.
  let result;
  
  let textLength = text.split(" ").length; // Split by words
  if(textLength > 0){
    let value = Math.ceil(textLength / wordsPerMinute);
    result = value;
  }

  return result;
}

app.post('/save', async (req, res, next) => {
  try {
    jwt.verify(req.headers.visitortoken, config.development.secret, (err, decoded) => {
      if (err) throw new Error("Visitor token invalid")
      return true
    })
        
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
      upvote_ratio: x.upvote_ratio.toFixed(2),
      visitor_token: req.headers.visitortoken,
      readTime: avgReadingTime(x.self_text)
    }))
    
    console.log('### pre-delete')
    await Post.deleteMany({
      visitor_token: req.headers.visitortoken
    })

    console.log('### pre-creaete')

    const posts = await Post.create(toInsert)

    res.send({
      posts,
      maxPages: Math.round(posts.length / 25)

    })
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
      excludeSeries,
      readTime,
      readTimeOperator
    } = req.query;

    jwt.verify(req.headers.visitortoken, config.development.secret, (err, decoded) => {
      if (err) throw new Error("Visitor token invalid")
      return true
    })

    let resLimit = 25;
    let page = req.query.page || 1;

    const query = {
      visitor_token: req.headers.visitortoken,
    }

    if (upvotes > 0) {
      if (operator === ">") {
        query.ups = {
          $gte: Number(upvotes)
        }
      }

      if (operator === "=") {
        query.ups = {
          $eq: Number(upvotes)
        }
      }

      if (operator === "<") {
        query.ups = {
          $lte: Number(upvotes)
        }
      }
    }

    if (readTime > 0) {
      if (readTimeOperator === ">") {
        query.readTime = {
          $gte: Number(readTime)
        }
      }

      if (readTimeOperator === "<") {
        query.readTime = {
          $lte: Number(readTime)
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

    const count = await Post.count(query);

    res.send({
      posts,
      nextPage: posts.length === resLimit ? page : -1,
      maxPages: Math.round(count / resLimit)

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