import express from 'express';
import { authHandler } from '../../middleware/middleware';
import bcrypt from 'bcryptjs';
import knex from '../../db/index'
import User from '../../db/Models/User'

const app = express.Router();

app.get('/auth', authHandler, async (req, res, next) => {
  try {
    const userId = res.locals.userId;
    const user = await User.findOne({
      where: {
        uuid: userId
      }
    }).then(res => res.dataValues)

    res.send(user);
  }

  catch(err) {
    next(err)

  }
});

app.post('/youtube', authHandler, async (req, res, next) => {
  try {
    const youtube_id = req.sanitize(req.body.youtube_id);

    User.update({
      youtube_id
    },{
      where: {
        uuid: res.locals.userId
      }
    })

    res.sendStatus(200);
  }

  catch(err) {
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
    next(err.code === "23505" ? "Email already exists" : `Error code: ${err.code}`)
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
    next(err)
  }
})

app.post('/reddit_profile', authHandler, async (req, res, next) => {
  try {
    const reddit_profile = req.body;
    const user = await knex('users').where({
      uuid: res.locals.userId
    }).update({
      reddit_profile: reddit_profile
    }).returning('*')
    
    res.send(user[0])
  }

  catch(err) {
    next(err)
  }
})

app.get('/patreon_tier', async (req, res) => {
  try {
    const {
      user_id
    } = req.query;

    const tier = await knex('users').where({
      uuid: user_id
    }).select('patreon_tier')

    res.send(tier[0])
  } catch (error) {
    
  }
})

module.exports = app;