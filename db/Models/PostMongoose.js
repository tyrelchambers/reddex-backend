import mongoose from 'mongoose'

const Schema = mongoose.Schema;

const postSchema = new Schema({
  author: String,
  title: String,
  self_text: String,
  ups: Number,
  url: String,
  num_comments: Number,
  created: Number,
  link_flair_text: String,
  post_id: String,
  subreddit: String,
  upvote_ratio: Number,
  viewed: {
    type: Boolean,
    default: false
  },
  visitor_token: String
})

const Post = mongoose.model("Post", postSchema)
module.exports = Post