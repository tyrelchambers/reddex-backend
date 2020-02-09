
import nodemailer from 'nodemailer';
const Email = require('email-templates');

const emailCon = new Email({
  message: {
    from: 'Reddex App <reddexapp@gmail.com>'
  },
  // uncomment below to send emails in development/test env:
//  send: true,
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

module.exports = emailCon;