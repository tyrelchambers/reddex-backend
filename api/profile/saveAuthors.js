import express from 'express';
import { authHandler } from '../../middleware/middleware';
import AuthorsMessaged from '../../db/Models/AuthorsMessaged'
import StoriesUsed from '../../db/Models/StoriesUsed'

const app = express.Router();

app.post('/saveAuthors', authHandler, async (req, res, next) => {
  try {
    const { userId } = res.locals;
    const name = req.sanitize(req.body.name);
    const post_id = req.sanitize(req.body.post_id);

    await AuthorsMessaged.create({
      name,
      user_id: userId
    })

    await StoriesUsed.create({
      post_id,
      user_id: userId
    })
    
    res.sendStatus(200);
  }

  catch(err) {
    next(err)

  }
});

app.get('/authors_messaged', authHandler, async (req, res, next) => {
  try {
    const userId = res.locals.userId;
    const authors = await AuthorsMessaged.findAll({
      where: {
        user_id: userId
      }
    })
    authors.map(x => x.dataValues)

    res.send(authors)
  }
  catch(err) {
    next(err)

  }
})

module.exports = app;