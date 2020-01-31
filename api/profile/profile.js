import express from 'express';
import { authHandler } from '../../middleware/middleware';
import bcrypt from 'bcryptjs';
import knex from '../../db/index'

const app = express.Router();

app.get('/auth', authHandler, async (req, res) => {
  try {
    const userId = res.locals.userId;
    const user = await knex('users').where({
      uuid: userId
    }).returning('*')

    res.send(user[0]);
  }

  catch(err) {
    console.log(err);
    res.send(400).json({error: err});
  }
});

app.post('/youtube', authHandler, async (req, res, next) => {
  try {
    const youtube_id = req.sanitize(req.body.youtube_id);
    await knex('users').where({
      uuid: res.locals.userId
    }).update({
      youtube_id
    })

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

    const email = req.sanitize(req.body.email);

    if ( !email ) throw new Error("No email provided");
    const user = await knex('users').where({
      uuid: res.locals.userId
    }).update({
      email
    }).returning('*')
    res.send(user)
  }

  catch(err) {
    console.log(err)
    res.status(500).send(err.code === "23505" ? "Email already exists" : `Error code: ${err.code}`)
    next(err)
  }
})

app.put('/update/password', authHandler, async (req, res, next) => {
  try {
    const newPassword = req.sanitize(req.body.newPassword);
    const currentPassword = req.sanitize(req.body.currentPassword);

    if (!newPassword || !currentPassword) throw new Error("No passwords provided");

    const user = await knex('users').where({
      uuid: res.locals.userId
    }).returning('*')
    const comparePasswords = await bcrypt.compareSync(currentPassword, user[0].password);

    if ( !comparePasswords ) throw new Error("Passwords don't match");

    const hashNewPassword = await bcrypt.hashSync(newPassword, 10);

    const newUser = await knex('users').where({
      uuid: res.locals.userId
    }).update({
      password: hashNewPassword
    }).returning('*')
    
    res.send(newUser)

  }

  catch(err) {
    console.log(err)
    res.status(500).send(err)
    next(err)
  }
})

app.delete('/delete', authHandler, async (req, res, next) => {
  try {
    const uuid = req.sanitize(req.query.uuid);

    if ( uuid !== res.locals.userId) throw new Error("Something went wrong");

    await knex('users').where({
      uuid
    }).del()
    
    res.send(200)
  }

  catch(err) {
    console.log(err)
    res.status(500).send(err)
    next(err)
  }
});

app.get('/stories_used', authHandler, async (req, res, next) => {
  try {
    const id = res.locals.userId;
    const stories = await knex('stories_used').where({user_id: id}).returning('*')
    res.send(stories)
  }

  catch(err) {
    console.log(err)
    res.status(500).send(err)
    next(err)
  }
})

app.post('/reddit_profile', authHandler, async (req, res, next) => {
  try {
    const reddit_profile = req.body.profile;
    
    const user = await knex('users').where({
      uuid: res.locals.userId
    }).update({
      reddit_profile: reddit_profile
    }).returning('*')
    res.send(user[0])
  }

  catch(err) {
    console.log(err)
    res.status(500).send(err)
    next(err)
  }
})

module.exports = app;