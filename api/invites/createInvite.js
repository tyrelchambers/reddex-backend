import express from 'express';
import Token from '../../models/Tokens';
import voucher_codes from 'voucher-code-generator';

const app = express.Router();

app.post('/createInvite', async (req, res) => {
  try {
    const voucher = () => {
      const token = voucher_codes.generate({
        length: 50,
        count: 1,
        charset: "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"
      });

      return token[0];
    };
   
    const token = await Token.create({
      token: voucher()
    });

    res.send(token);
  }

  catch(err) {
    console.log(err);
  }
});

module.exports = app;