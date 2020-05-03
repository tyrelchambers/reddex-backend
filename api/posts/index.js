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
      upvote_ratio: x.upvote_ratio,
      visitor_token: req.headers.visitortoken
    }))
    await Post.deleteMany({
      visitor_token: req.headers.visitortoken
    })

    const posts = await Post.create(toInsert)
    
    

    res.send(posts)
  } catch (error) {
    next(error)
  }
})

app.get('/', async (req, res, next) => {
  try {
    const posts = await Post.find({
      visitor_token: req.headers.visitortoken

    })
    
    res.send(posts)
  } catch (error) {
    next(error)
  }
})

module.exports = app