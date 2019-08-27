import express from 'express';
import Token from '../../models/Tokens';
import voucher from '../../helpers/inviteCode';

const app = express.Router();


app.post('/createInvite', async (req, res) => {
  try {
    const vouch = voucher();
    const token = await Token.create({
      token: vouch
    });
    res.send(token);
  }

  catch(err) {
    console.log(err);
    res.status(403).send(err);
  }
});

module.exports = app;