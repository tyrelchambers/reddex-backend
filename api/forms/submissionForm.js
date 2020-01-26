import express from 'express'
import emailCon from '../../libs/emailConfig'
import knex from '../../db/index'

const app = express.Router();

app.post('/submit', async (req, res) => {
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
  
});

module.exports = app;