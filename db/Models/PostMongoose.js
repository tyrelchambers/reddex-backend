const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const postSchema = new Schema(
  {
    subreddit: String,
    visitor_token: String,

    posts: [{
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
        default: false,
      },
      page: Number,
      readTime: Number,
    }]
  },
  { timestamps: { createdAt: "created_at" } }
);

postSchema.index(
  {
    title: "text",
    self_text: "text",
    author: "text",
  },
  {
    weights: {
      self_text: 15,
      title: 7,
    },
  }
);
const Post = mongoose.model("Post", postSchema);
module.exports = Post;
