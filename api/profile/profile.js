import express from 'express';
import User from '../../models/User';
import { authHandler } from '../../middleware/middleware';

const app = express.Router();

app.get('/auth', authHandler, async (req, res) => {
  try {
    const userId = res.locals.userId;

    const user = await User.findOne({_id: userId}, {password: 0});

    res.send(user);
  }

  catch(err) {
    console.log(err);
    res.send(400).json({error: err});
  }
});

app.post('/default_message', authHandler, async (req, res) => {
  try {
    const userId = res.locals.userId;
    const { defaultMessage } = req.body;

    const user = await User.findOneAndUpdate({_id: userId}, {defaultMessage});

    res.send(user.defaultMessage);
  }

  catch(err) {
    console.log(err);
    res.send(400).json({error: err});
  }
});

app.post('/alt_message', authHandler, async (req, res) => {
  try {
    const userId = res.locals.userId;
    const { altMessage } = req.body;

    const user = await User.findOneAndUpdate({_id: userId}, {altMessage});

    res.send(user.altMessage);
  }

  catch(err) {
    console.log(err);
    res.send(400).json({error: err});
  }
});


module.exports = app;