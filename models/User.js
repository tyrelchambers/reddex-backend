import mongoose from 'mongoose';

const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const userSchema = new Schema({
  email: String,
  password: String,
  access_token: String,
  refresh_token: String,
  authorsMessaged: [String],
  storiesUsed: [String],
  altMessage: String,
  defaultMessage: String,
  initialGreeting: String,
  repeatGreeting: String,
  completedStories: [{
    type: ObjectId,
    ref: 'Story'
  }],
  readingList: [{
    type: ObjectId,
    ref: 'Story'
  }],
  fullStories: [{
    type: ObjectId,
    ref: 'Story'
  }]
});

const User = mongoose.model("User", userSchema);

module.exports = User;


