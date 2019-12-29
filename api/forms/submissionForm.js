import express from 'express'
import Website from '../../models/Website'
import nodemailer from 'nodemailer';

const Email = require('email-templates');

const app = express.Router();
const emailCon = new Email({
  message: {
    from: 'Reddex App <reddexapp@gmail.com>'
  },
  // uncomment below to send emails in development/test env:
  send: true,
  transport: nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
           user: process.env.GMAIL_ACCOUNT,
           pass: process.env.GMAIL_PASSWORD
       }
   })
});

app.post('/submit', async (req, res) => {
  const {
    email,
    senderName,
    message,
    sentToOthers,
    subdomain
  } = req.body;

  const website = await Website.findOne({_id: subdomain}).populate("user_id");

  emailCon
  .send({
    template: 'mars',
    message: {
      to: website.user_id.email
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
  
});

module.exports = app;