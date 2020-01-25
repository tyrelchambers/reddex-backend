import express from 'express';
import { authHandler } from '../../middleware/middleware';
import uuidv4 from 'uuid'
import knex from '../../db/index'

const app = express.Router();

app.post('/save_story', authHandler, async (req, res) => {
  try {
    const author = req.sanitize(req.body.author);
    const title = req.sanitize(req.body.title);
    const selftext = req.sanitize(req.body.selftext);
    const ups = req.sanitize(req.body.ups);
    const url = req.sanitize(req.body.url);
    const num_comments = req.sanitize(req.body.num_comments);
    const flair = req.sanitize(req.body.flair);
    const postId = req.sanitize(req.body.postId);
    const permission = req.sanitize(req.body.permission);
    const subreddit = req.sanitize(req.body.subreddit);
      
    await knex('stories').insert({
      uuid: uuidv4(),
      author,
      title,
      self_text: selftext,
      ups,
      url,
      num_comments,
      flair,
      post_id: postId,
      permission,
      subreddit,
      user_id: res.locals.userId
    })

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

    const story = await knex('stories')
                          .where('author', 'like', `%${title}%`)
                          .where({author})
                          .returning('*')
    console.log(story)
    res.send(story);
  }

  catch(err) {
    console.log(err)
  }
});

// // sets PERMISSION of singular story (used in InboxMessage)
// app.post('/set_permission', authHandler, async (req, res) => {
//   try {
//      const author = req.sanitize(req.body.author);
//      const title = req.sanitize(req.body.title);
//      const permission = req.sanitize(req.body.permission);

//     const story = await Story.findOne({user_id: res.locals.userId, title: new RegExp(title, 'i'), author});

//     story.save(err => {
//       if ( err ) throw new Error(err);

//       story.permission = permission;
//       story.save();
//     });

//     res.sendStatus(200);
//   }

//   catch(err) {
//     console.log(err)
//   }
// });

// Get all stories with TRUE permission
app.get('/reading_list', authHandler, async (req, res) => {
  try {
    const {
      permission
    } = req.query

    const story = await knex('stories').where({
      user_id: res.locals.userId,
      permission,
      read: false
    }).returning('*')
    
    res.send(story);
  }

  catch(err) {
    console.log(err);
  }
});

app.post('/stories/completed', authHandler, async (req, res) => {
  try {

    const read = req.body.read;
    const author = req.sanitize(req.body.author);
    const title = req.sanitize(req.body.title);

    await knex('stories').where({
      user_id: res.locals.userId,
      title,
      author
    }).update({
      read
    })
    
    res.sendStatus(200);
  }

  catch(err) {
    console.log(err);
  }
});

app.get('/stories/completed', authHandler, async (req, res, next) => {
  try {
    const story = await knex('stories').where({
      user_id: res.locals.userId,
      read: true
    }).returning('*')
    
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
      post_id
    } = req.query;
    await knex('stories').where({post_id}).del()
    
    res.send("Story removed");
  }

  catch(err) {
    console.log(err)
    next(err);
  }
});

module.exports = app;