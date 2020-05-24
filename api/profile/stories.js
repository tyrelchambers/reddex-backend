import express from 'express';
import { authHandler } from '../../middleware/middleware';
import Story from '../../db/Models/Story'
import { Op } from 'sequelize'
import Tag from '../../db/Models/Tag'
const app = express.Router();

app.post('/save_story', authHandler, async (req, res, next) => {
  try {
    const author = req.sanitize(req.body.author);
    const title = req.sanitize(req.body.title);
    const self_text = req.sanitize(req.body.self_text);
    const ups = req.sanitize(req.body.ups);
    const url = req.sanitize(req.body.url);
    const num_comments = req.sanitize(req.body.num_comments);
    const link_flair_text = req.sanitize(req.body.link_flair_text);
    const post_id = req.sanitize(req.body.post_id);
    const permission = req.body.permission;
    const subreddit = req.sanitize(req.body.subreddit);

    const existingStory = await Story.findOne({
      where: {
        author,
        title,
        self_text,
        post_id,
        user_id: res.locals.userId
      }
    }).then(res => {
      if (res) {
        return res.dataValues
      }
    })

   if (existingStory) throw new Error("Story already exists")

    const stories = await Story.create({
      author,
      title,
      self_text,
      ups,
      url,
      num_comments,
      flair: link_flair_text,
      post_id,
      permission,
      subreddit,
      user_id: res.locals.userId
    })

    res.send(stories);
  }
  catch(err) {
    next(err)
  }
});

app.get('/get_story', authHandler, async (req, res, next) => {
  try {
    const {
      author,
      title,
      story_id
    } = req.query;

    const story = await Story.findOne({
      where: !story_id ? {
        user_id: res.locals.userId,
        title: {
          [Op.substring]: `${title.substring(0, title.length - 3)}`,
        },
        author
      } : {
        uuid: story_id
      },
      include: Tag
    }).then(res => {
      if (res) {
        return res.dataValues
      }
    })
                          
    res.send(story);
  }

  catch(err) {
    next(err)
  }
});

// sets PERMISSION of singular story (used in InboxMessage)
app.post('/set_permission', authHandler, async (req, res, next) => {
  try {
     const author = req.sanitize(req.body.author);
     const title = req.sanitize(req.body.title);
     const permission = req.body.permission;

    await Story.update({
      permission
    }, {
      where: {
        user_id: res.locals.userId,
        title: {
          [Op.iLike]: `${title.substring(0, title.length - 3)}%`
        },
        author
      }
    })
    
    res.sendStatus(200);
  }

  catch(err) {
    next(err)

  }
});

// Get all stories with TRUE permission
app.get('/reading_list', authHandler, async (req, res, next) => {
  try {
    const {
      permission,
      subreddit,
      tag,
      keywords
    } = req.query


    let headers = [];

    const query = {
      where: {
        user_id: res.locals.userId,
        [Op.or]: [
          {
            permission,
            read: null
          },
          {
            permission,
            read: false,
          }
        ],
      },
      include: {
        model: Tag
      }
    }

    if (keywords) {
      query.where = {
        permission,
        self_text: {
          [Op.substring]: keywords
        }
      }
    }

    if ( subreddit ) {
      query.where.subreddit = {
        [Op.iLike]: subreddit
      }
    }

    if (tag) {
      query.include.where = {
        tag
      }
    }

    const story = await Story.findAll(query).then(res => res.map(x => x.dataValues));
    
    story.map(x => {
      if (!headers.includes(x.subreddit)) {
        headers.push(x.subreddit)
      }
    })  
    res.send({
      headers,
      stories: story
    });
  }

  catch(err) {
    next(err)

  }
});

app.post('/stories/completed', authHandler, async (req, res, next) => {
  try {
    const read = req.body.read;
    const uuid = req.body.uuid;

    await Story.update({
      read
    }, {
      where: {
        user_id: res.locals.userId,
        uuid
      }
    })
  
    
    res.sendStatus(200);
  }

  catch(err) {
    next(err)
  }
});

app.get('/stories/completed', authHandler, async (req, res, next) => {
  try {
    const story = await Story.findAll({
      where: {
        user_id: res.locals.userId,
        read: true
      }
    })

    story.map(x => x.dataValues)

    res.send(story);
  }
  
  catch(err) {
    next(err)

  }
})

app.delete('/stories/remove', authHandler, async (req, res, next) => {
  try {
    const {
      uuid
    } = req.query;
    
    await Story.destroy({
      where: {
        uuid
      }
    })

    res.send("Story removed");
  }

  catch(err) {
    next(err)

  }
});

module.exports = app;