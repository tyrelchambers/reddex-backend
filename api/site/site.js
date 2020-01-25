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

    res.status(200).send(website);
  }

  catch(err) {
    console.log(err)
    next(err);
    res.send(500, {err: err.message})
  }
})

app.post('/update', authHandler, async (req, res, next) => {
  try {
    const subdomain = req.sanitize(req.body.subdomain);
    const title = req.sanitize(req.body.title);
    const twitter = req.sanitize(req.body.twitter);
    const facebook = req.sanitize(req.body.facebook);
    const instagram = req.sanitize(req.body.instagram);
    const patreon = req.sanitize(req.body.patreon);
    const youtube = req.sanitize(req.body.youtube);
    const podcast = req.sanitize(req.body.podcast);
    const accent = req.sanitize(req.body.accent);
    const theme = req.sanitize(req.body.theme);
    const introduction = req.sanitize(req.body.introduction);
    const bannerURL = req.sanitize(req.body.bannerURL);
    const submissionForm = req.sanitize(req.body.submissionForm);
    const youtubeId = req.sanitize(req.body.youtubeId);
    const youtubeTimeline = req.sanitize(req.body.youtubeTimeline);
    const twitterId = req.sanitize(req.body.twitterId);
    const twitterTimeline = req.sanitize(req.body.twitterTimeline);
    const showCreditLink = req.sanitize(req.body.showCreditLink);



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
      theme,
      introduction,
      bannerURL,
      submissionForm,
      youtubeId,
      youtubeTimeline,
      twitterId,
      twitterTimeline,
      showCreditLink
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

app.delete('/delete', authHandler, async (req, res, next) => {
  try {
    const {
      siteId
    } = req.query;

    await Website.findOneAndRemove({_id: siteId});
    res.send("Site deleted")
  }

  catch(err) {
    console.log(err)
    next(err);
    res.send(500, {err: err.message})
  }
})
module.exports = app;