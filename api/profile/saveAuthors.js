import express from 'express';
import User from '../../models/User';
import { authHandler } from '../../middleware/middleware';

const app = express.Router();

app.post('/saveAuthors', authHandler, async (req, res) => {
  try {
    const { userId } = res.locals;
    const author = req.sanitize(req.body.author);
    const postId = req.sanitize(req.body.postId);


    await User.findOneAndUpdate({_id: userId}, { $addToSet: { authorsMessaged: author, storiesUsed: postId}});

    res.sendStatus(200);
  }

  catch(err) {
    console.log(err);
    res.status(500).json({err});
  }
});

module.exports = app;