import express from 'express';
import Token from '../../models/Tokens';
import {voucher} from '../../helpers/inviteCode';

const app = express.Router();


app.post('/createInvite', async (req, res) => {
  try {
    const token = await Token.create({
      token: voucher()
    });

    res.send(token);
  }

  catch(err) {
    console.log(err);
    res.status(403).send(err);
  }
});

module.exports = app;