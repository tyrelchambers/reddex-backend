import express from 'express'
import Website from '../../models/Website'
import emailCon from '../../libs/emailConfig'

const app = express.Router();

app.post('/submit', async (req, res) => {
  const email = req.sanitize(req.body.email);
  const senderName = req.sanitize(req.body.senderName);
  const message = req.sanitize(req.body.message);
  const sentToOthers = req.sanitize(req.body.sentToOthers);
  const subdomain = req.sanitize(req.body.subdomain);

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