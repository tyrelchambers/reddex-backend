import express from 'express';
import User from '../../models/User';
import { authHandler } from '../../middleware/middleware';

const app = express.Router();

app.get('/getTokens', authHandler, async (req, res) => {
  try {
    const userId = res.locals.userId;
    const user = await User.findOne({_id: userId});

    if (!user) throw new Error("No user");

    res.json({
      refresh_token: user.refresh_token,
      access_token: user.access_token
    })
  }

  catch(err) {
    console.log(err);
    res.status(503).json({error: err});
  }
});

app.post('/saveTokens', authHandler, async (req ,res) => {
  try {
    const userId = res.locals.userId;
    const { access_token, refresh_token } = req.body;
    await User.findOneAndUpdate({_id: userId}, {access_token, refresh_token});

    res.send(200);
  }

  catch(err) {
    console.log(err);
    res.status(400).send(err);
  }
});
module.exports = app;