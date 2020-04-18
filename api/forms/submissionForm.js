import express from 'express'
import emailCon from '../../libs/emailConfig'
import {authHandler} from '../../middleware/middleware.js'
import Website from '../../db/Models/Website'
import SubmissionFormOptions from '../../db/Models/SubmissionFormOptions'
import SubmittedStories from '../../db/Models/SubmittedStories'

const app = express.Router();

app.post('/submit', async (req, res, next) => {
  try {
    const story_email = req.sanitize(req.body.email.value);
    const author = req.sanitize(req.body.author.value);
    const tags = req.sanitize(req.body.tags.value);
    const sent_to_others = req.body.sent_to_others;
    const website = req.sanitize(req.body.website_id);
    const story_title = req.sanitize(req.body.story_title.value);
    const body = req.sanitize(req.body.body)

    const sent_to_others_formatted = sent_to_others.value === null ? false : sent_to_others.value;

    const subdomain = await Website.findOne({
      where: {
        uuid: website
      },
      include: "User"
    })

    await SubmittedStories.create({
      email: story_email,
      author,
      tags,
      sent_to_others: sent_to_others_formatted,
      story_title,
      body,
      user_id: subdomain.User.user_id
    })

    emailCon
    .send({
      template: 'mars',
      message: {
        to: subdomain.User.email
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


    await SubmissionFormOptions.findOrCreate({
      where: {
        story_title: JSON.stringify(story_title),
        author: JSON.stringify(author),
        email: JSON.stringify(email),
        sent_to_others: JSON.stringify(sent_to_others),
        tags: JSON.stringify(tags),
        website_id: website
      }
    })

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

    const form = await SubmissionFormOptions.findOne({
      where: {
        website_id: sid
      }
    }).then(res => res.dataValues)
    res.send(form)
  }

  catch(err) {
    next(err)

  }
})



module.exports = app;
