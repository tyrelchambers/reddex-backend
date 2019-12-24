import express from 'express'
import {authHandler } from '../../middleware/middleware';
import Website from '../../models/Website'
import User from '../../models/User'

const app = express.Router();

app.post('/activate', authHandler, async (req, res, next) => {
  try {
    const website = await Website.create({
      user_id: res.locals.userId
    });
    
    await User.findOneAndUpdate({_id: res.locals.userId}, {website: website._id})

    res.sendStatus(200);
  }

  catch(err) {
    console.log(err)
    next(err);
    res.send(500, {err: err.message})
  }
})

app.post('/update', authHandler, async (req, res, next) => {
  try {
    const {
      subdomain,
      title,
      twitter,
      facebook,
      instagram,
      patreon,
      youtube,
      podcast,
      accent,
      theme
    } = req.body;

    const website = await Website.findOneAndUpdate({user_id: res.locals.userId}, {
      subdomain,
      title,
      twitter,
      facebook,
      instagram,
      patreon,
      youtube,
      podcast,
      accent,
      theme
    })

    await User.findOneAndUpdate({_id: res.locals.userId}, {website: website._id}); 

    res.send(website)
  }

  catch(err) {
    console.log(err)
    next(err);
    res.send(500, {err: err.message})
  }
})

app.get('/config', authHandler, async (req, res, next) => {
  try {
    const website = await Website.findOne({user_id: res.locals.userId});
    res.send(website);
  }

  catch(err) {
    console.log(err)
    next(err);
    res.send(500, {err: err.message})
  }
})

app.get('/', async (req, res, next) => {
  try {
    const {
      subdomain
    } = req.query;

    const website = await Website.findOne({subdomain});

    res.send(website);
  }

  catch(err) {
    console.log(err)
    next(err);
    res.send(500, {err: err.message})
  }
})

module.exports = app;