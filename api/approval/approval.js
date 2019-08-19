import express from 'express';
import nodemailer from 'nodemailer';
import voucher from '../../helpers/inviteCode';

const Email = require('email-templates');

const app = express.Router();


app.post('/', (req, res) => {
  const {
    youtubeChannel,
    youtubeLink,
    channelType,
    fullName,
    email
  } = req.body;

  const emailTemp = new Email({
    message: {
      from: email
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

  emailTemp
  .send({
    template: 'mars',
    message: {
      to: 'aftermidnightvideos@gmail.com'
    },
    locals: {
      youtubeChannel,
      youtubeLink,
      channelType,
      email,
      fullName
    }
  })
  .then()
  .catch(console.error);

  res.status(200).json({message: "Your form has been received!"});
});

app.get('/approved', (req, res) => {
  try {
    const { 
      email,
      approved,
      fullName
    } = req.query;

    const emailTemp = new Email({
      message: {
        from: "Stories After Midnight"
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
  
    if (approved == "true") {
      emailTemp
      .send({
        template: "approved",
        message: {
          to: email
        },
        locals: {
          email,
          fullName,
          code: voucher()
        }
      })
      .then()
      .catch(console.error);
    } 

    if ( approved == "false" ) {
      
      emailTemp
      .send({
        template: "denied",
        message: {
          to: email
        },
        locals: {
          email,
          fullName,
        }
      })
      .then()
      .catch(console.error);
      
    }
    res.status(200).json({status: "Sent "});
  }

  catch(err) {
    console.log(err)
    res.status(500).json(err);
  }
})

module.exports = app;