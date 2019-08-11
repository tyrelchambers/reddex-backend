import express from 'express';
import { authHandler } from '../../middleware/middleware';
import User from '../../models/User';
import Story from '../../models/Story';

const app = express.Router();

app.post('/save_story', authHandler, async (req, res) => {
  try {
    const user = await User.findOne({_id: res.locals.userId});
    const {
      author,
      title,
      selftext,
      ups,
      url,
      num_comments,
      created,
      flair,
      postId,
      id
    } = req.body;

    const story = await Story.create({
      author,
      title,
      selftext,
      ups,
      url,
      num_comments,
      created,
      flair,
      postId,
      id,
      user_id: user
    });

    user.save(err => {
      if ( err ) throw new Error(err);

      user.fullStories.push(story._id);
      user.save();
    });

    res.sendStatus(200);
  }

  catch(err) {
    console.log(err);
  }
});

app.get('/get_stories', authHandler, async (req, res) => {
  try {
    const stories = await Story.find({user_id: res.locals.userId});
    res.send(stories);
  }

  catch(err) {
    console.log(err);
  }
});

app.get('/get_story', authHandler, async (req, res) => {
  try {
    const {
      author,
      title
    } = req.query;

    const story = await Story.findOne({user_id: res.locals.userId, title, author}, { user_id: 0});
    res.send(story);
  }

  catch(err) {
    console.log(err)
  }
});

module.exports = app;