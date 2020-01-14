import express from 'express';
import { authHandler } from '../../middleware/middleware';
import User from '../../models/User';
import Story from '../../models/Story';

const app = express.Router();

app.post('/save_story', authHandler, async (req, res) => {
  try {
    const author = req.sanitize(req.body.author);
    const title = req.sanitize(req.body.title);
    const selftext = req.sanitize(req.body.selftext);
    const ups = req.sanitize(req.body.ups);
    const url = req.sanitize(req.body.url);
    const num_comments = req.sanitize(req.body.num_comments);
    const created = req.sanitize(req.body.created);
    const flair = req.sanitize(req.body.flair);
    const postId = req.sanitize(req.body.postId);
    const permission = req.sanitize(req.body.permission);
    const id = req.sanitize(req.body.id);
    const subreddit = req.sanitize(req.body.subreddit);
    
    const user = await User.findOne({_id: res.locals.userId});
    
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
      user_id: user,
      permission,
      subreddit
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

app.get('/get_story', authHandler, async (req, res) => {
  try {
    const {
      author,
      title
    } = req.query;

    const story = await Story.findOne({user_id: res.locals.userId, title: new RegExp(title, 'i'), author}, { user_id: 0, _id: 0});
    res.send(story);
  }

  catch(err) {
    console.log(err)
  }
});

// sets PERMISSION of singular story (used in InboxMessage)
app.post('/set_permission', authHandler, async (req, res) => {
  try {
     const author = req.sanitize(req.body.author);
     const title = req.sanitize(req.body.title);
     const permission = req.sanitize(req.body.permission);

    const story = await Story.findOne({user_id: res.locals.userId, title: new RegExp(title, 'i'), author});

    story.save(err => {
      if ( err ) throw new Error(err);

      story.permission = permission;
      story.save();
    });

    res.sendStatus(200);
  }

  catch(err) {
    console.log(err)
  }
});

// Get all stories with TRUE permission
app.get('/reading_list', authHandler, async (req, res) => {
  try {
    const {
      permission
    } = req.body

    const story = await Story.find({user_id: res.locals.userId, permission, read: false});

    res.send(story);
  }

  catch(err) {
    console.log(err);
  }
});

app.post('/stories/completed', authHandler, async (req, res) => {
  try {

    const read = req.sanitize(req.body.read);
    const author = req.sanitize(req.body.author);
    const title = req.sanitize(req.body.title);

    const story = await Story.findOne({user_id: res.locals.userId, title, author});

    story.save(err => {
      if ( err ) throw new Error(err);

      story.read = read;
      story.save();
    });
    res.sendStatus(200);
  }

  catch(err) {
    console.log(err);
  }
});

app.get('/stories/completed', authHandler, async (req, res, next) => {
  try {
    const story = await Story.find({user_id: res.locals.userId, read: true}, { user_id: 0, _id: 0});
    res.send(story);
  }
  
  catch(err) {
    console.log(err);
    next(err)
  }
})

app.delete('/stories/remove', authHandler, async (req, res, next) => {
  try {
    const {
      postId
    } = req.query;
    await Story.findOneAndRemove({postId});
    res.send("Story removed");
  }

  catch(err) {
    console.log(err)
    next(err);
  }
});

module.exports = app;