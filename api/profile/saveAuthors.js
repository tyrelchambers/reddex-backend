import express from 'express';
import User from '../../models/User';
import { authHandler } from '../../middleware/middleware';

const app = express.Router();

app.post('/saveAuthors', authHandler, async (req, res) => {
  try {
    const { author, postId } = req.body;
    const { userId } = res.locals;
    await User.findOneAndUpdate({_id: userId}, { $addToSet: { authorsMessaged: author, storiesUsed: postId}});

    res.send(200);
  }

  catch(err) {
    console.log(err);
    res.status(500).json({err});
  }
});

module.exports = app;