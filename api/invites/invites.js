import express from 'express';
import Token from '../../models/Tokens';

const app = express.Router();

app.get('/', async (req, res) => {
  try {
    const { inviteCode } = req.query;
    const token = await Token.findOne({token: inviteCode});

    if ( token.used ) throw new Error("Token already used");

    res.send(200);
  }

  catch(err) {
    console.log(err);
    res.status(403).send(err);
  }
});

module.exports = app;