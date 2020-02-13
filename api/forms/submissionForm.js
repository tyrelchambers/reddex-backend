import express from 'express'
import emailCon from '../../libs/emailConfig'
import knex from '../../db/index'
import {authHandler} from '../../middleware/middleware.js'
import uuidv4 from 'uuid'

const app = express.Router();

app.post('/submit', async (req, res, next) => {
  try {
    const story_email = req.sanitize(req.body.email.value);
    const author = req.sanitize(req.body.author.value);
    const tags = req.sanitize(req.body.tags.value);
    const sent_to_others = req.body.sent_to_others;
    const website = req.sanitize(req.body.website);
    const story_title = req.sanitize(req.body.story_title.value);
    const body = req.sanitize(req.body.body)

    const sent_to_others_formatted = sent_to_others.value === null ? false : sent_to_others.value;

    const subdomain = await knex('websites').where({
      uuid: website
    })

    const site = await knex('websites').select('email').where({
      subdomain: subdomain[0].subdomain
    })
    .innerJoin('users', 'websites.user_id', 'users.uuid')

    await knex('submitted_stories').insert({
      uuid: uuidv4(),
      email: story_email,
      author,
      tags,
      sent_to_others: sent_to_others_formatted,
      sid: website,
      story_title,
      body,
      user_id: subdomain[0].user_id
    })

    emailCon
    .send({
      template: 'mars',
      message: {
        to: site[0].email
      },
      
      locals: {
        email: story_email,
        story_title,
        author,
        body,
        sent_to_others
      }
    })
    .then()
    .catch(console.error);

    res.status(200).json({message: "Your story has been sent, thank you!"});
  }
  
  catch (error) {
    next(error)

  }
});

app.post('/save', authHandler, async (req, res, next) => {
  try {
    const story_title = req.body.story_title;
    const author = req.body.author;
    const email = req.body.email;
    const sent_to_others = req.body.sent_to_others;
    const tags = req.body.tags;
    const website = req.body.website;

    const existingSite = await knex('submission_form_options').where({
      website_id: website
    }).returning('*')

    if (existingSite[0]) {
      await knex('submission_form_options').where({
        website_id: website
      })
      .update({
        story_title: JSON.stringify(story_title),
        author: JSON.stringify(author),
        email: JSON.stringify(email),
        sent_to_others: JSON.stringify(sent_to_others),
        tags: JSON.stringify(tags),
      }).returning('*')
    } else {
      const options = await knex('submission_form_options').insert({
          story_title: JSON.stringify(story_title),
          author: JSON.stringify(author),
          email: JSON.stringify(email),
          sent_to_others: JSON.stringify(sent_to_others),
          tags: JSON.stringify(tags),
          uuid: uuidv4(),
          website_id: website
        }).returning("uuid")

        await knex("websites").where({
        uuid: website
      }).update({
        options_id: options[0]
      });
    
    }
    res.sendStatus(200);
  }

  catch(err) {
    next(err)

  }
}) 

app.get('/', async (req, res, next) => {
  try {
    const {
      sid
    } = req.query;

    const form = await knex('submission_form_options').where({
      website_id: sid
    }).innerJoin('websites', 'submission_form_options.website_id', 'websites.uuid')


    res.send(form[0])
  }

  catch(err) {
    next(err)

  }
})



module.exports = app;