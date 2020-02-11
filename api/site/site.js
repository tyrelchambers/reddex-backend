import express from 'express'
import {authHandler } from '../../middleware/middleware';
import knex from '../../db/index'
import uuidv4 from 'uuid'

const app = express.Router();

app.post('/activate', authHandler, async (req, res, next) => {
  try {
    const website = await knex('websites').insert({
      uuid: uuidv4(),
      user_id: res.locals.userId
    }).returning('*')

    res.status(200).send(website[0]);
  }

  catch(err) {
    next(err)

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
    const banner_url = req.sanitize(req.body.banner_url);
    const submission_form = req.body.submission_form;
    const youtube_id = req.sanitize(req.body.youtube_id);
    const youtube_timeline = req.body.youtube_timeline;
    const twitter_id = req.sanitize(req.body.twitter_id);
    const twitter_timelines = req.body.twitter_timelines;
    const show_credit_link = req.body.show_credit_link;
    const headline = req.sanitize(req.body.headline)
    const submission_title = req.sanitize(req.body.submission_title);
    const rules = req.sanitize(req.body.rules);

    const website = await knex('websites').where({
      user_id: res.locals.userId
    }).update({
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
      banner_url,
      submission_form,
      youtube_id,
      youtube_timeline,
      twitter_id,
      twitter_timelines,
      show_credit_link,
      headline,
      submission_title,
      rules
    }).returning('*')

    res.send(website)
  }

  catch(err) {
    next(err)

  }
})

app.get('/config', authHandler, async (req, res, next) => {
  try {
    const website = await knex('websites').where({
      user_id: res.locals.userId
    }).returning('*')
    
    res.send(website[0]);
  }

  catch(err) {
    next(err)

  }
})

app.get('/', async (req, res, next) => {
  try {
    const {
      subdomain
    } = req.query;

    const website = await knex('websites').where({
      subdomain
    })
    .returning('*')
    
    res.send(website[0]);
  }

  catch(err) {
    next(err)

  }
})

app.delete('/delete', authHandler, async (req, res, next) => {
  try {
    const {
      uuid
    } = req.query;

    await knex('websites').where({
      uuid
    }).del()
    
    res.send("Site deleted")
  }

  catch(err) {
    next(err)

  }
})
module.exports = app;