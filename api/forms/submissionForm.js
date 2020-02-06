import express from 'express'
import emailCon from '../../libs/emailConfig'
import knex from '../../db/index'
import {authHandler} from '../../middleware/middleware.js'
import uuidv4 from 'uuid'
const app = express.Router();

app.post('/submit', async (req, res, next) => {
  try {
    const email = req.sanitize(req.body.email);
    const senderName = req.sanitize(req.body.senderName);
    const message = req.sanitize(req.body.message);
    const sentToOthers = req.sanitize(req.body.sentToOthers);
    const subdomain = req.sanitize(req.body.subdomain);
    const website = await knex('websites').where({
      subdomain
    })
    .innerJoin('users', 'websites.user_id', 'users.uuid')
    .returning('*')

    emailCon
    .send({
      template: 'mars',
      message: {
        to: website[0].email
      },
      locals: {
        email,
        senderName,
        message,
        sentToOthers
      }
    })
    .then()
    .catch(console.error);

    res.status(200).json({message: "Your story has been sent, thank you!"});
  }
  
  catch (error) {
    console.log(error)
    res.status(500).send(error.message)
    next(error)
  }
});

app.post('/save', authHandler, async (req, res, next) => {
  try {
    const title = req.body.title;
    const author = req.body.author;
    const email = req.body.email;
    const sent_to_others = req.body.sent_to_others;
    const tags = req.body.tags;
    const website = req.body.website;

    await knex('submission_form_options').insert({
      title: JSON.stringify(title),
      author: JSON.stringify(author),
      email: JSON.stringify(email),
      sent_to_others: JSON.stringify(sent_to_others),
      tags: JSON.stringify(tags),
      uuid: uuidv4(),
      website_id: website
    })

    res.sendStatus(200);
  }

  catch(err) {
    console.log(err)
    res.status(500).send(err.message)
    next(err)
  }
})

module.exports = app;