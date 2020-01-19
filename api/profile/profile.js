import express from 'express';
import User from '../../models/User';
import { authHandler } from '../../middleware/middleware';
import bcrypt from 'bcryptjs';

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

app.post('/youtube', authHandler, async (req, res) => {
  try {
    const user = await User.findOne({_id: res.locals.userId});
    const { youtubeId } = req.body;

    user.save(err => {
      if ( err ) throw new Error(err);

      user.youtubeId = youtubeId;
      user.save();
    });

    res.sendStatus(200);
  }

  catch(err) {
    console.log(err)
    res.status(500).send(err)
    next(err)
  }
});

app.put('/update/email', authHandler, async (req, res, next) => {
  try {
    const {
      email
    } = req.body;

    if ( !email ) throw new Error("No email provided");
    const user = await User.findOneAndUpdate({_id: res.locals.userId}, {email});

    res.send(user)
  }

  catch(err) {
    console.log(err)
    res.status(500).send(err)
    next(err)
  }
})

app.put('/update/password', authHandler, async (req, res) => {
  try {
    const {
      newPassword,
      currentPassword
    } = req.body;

    if (!newPassword || !currentPassword) throw new Error("No passwords provided");

    const user = await User.findOne({_id: res.locals.userId});
    const comparePasswords = await bcrypt.compareSync(currentPassword, user.password);

    if ( !comparePasswords ) throw new Error("Passwords don't match");

    const hashNewPassword = await bcrypt.hashSync(newPassword, 10);

    const newUser = await User.findOneAndUpdate({_id: res.locals.userId}, {password: hashNewPassword});
    res.sendStatus(newUser)

  }

  catch(err) {
    console.log(err)
    res.status(500).send(err)
    next(err)
  }
})

app.delete('/delete', authHandler, async (req, res) => {
  try {
    const {
      id
    } = req.query;

    if ( id !== res.locals.userId) throw new Error("Something went wrong");

    await User.findOneAndRemove({_id: id});
    res.send(200)
  }

  catch(err) {
    console.log(err)
    res.status(500).send(err)
    next(err)
  }
});

module.exports = app;