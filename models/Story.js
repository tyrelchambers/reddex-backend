import mongoose from 'mongoose';

const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const storySchema = new Schema({
  author: String,
  created: Number,
  flair: String,
  id: Number,
  num_comments: Number,
  postId: String,
  selftext: String,
  title: String,
  ups: Number,
  url: String,
  subreddit: String,
  permission: {
    type: Boolean,
    default: false
  },
  read: {
    type: Boolean,
    default: false
  },
  user_id: {
    type: ObjectId,
    ref: 'User'
  }
});

const Story = mongoose.model('Story', storySchema);

module.exports = Story;