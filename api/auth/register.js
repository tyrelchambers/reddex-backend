import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../../models/User';
import config from '../../config';
import Token from '../../models/Tokens';

const app = express.Router();

app.post('/register', async (req, res) => {
  try {
    const { email, password, access_token, refresh_token, inviteCode } = req.body;
    if ( !email || !password ) res.send("No email or password");
    const hashPassword = bcrypt.hashSync(password, 10);
    const existingUser = await User.findOne({email});
    console.log(inviteCode)
    if (existingUser) throw res.status(400).json({error: "User already exists"});

    const user = await User.create({
      email,
      password: hashPassword,
      access_token,
      refresh_token
    });

    const inviteToken = await Token.findOne({token: inviteCode});

    inviteToken.save(err => {
      if ( err ) throw new Error(err);

      inviteToken.used = true;
      inviteToken.save();
    }); 
    
    const token = jwt.sign({id: user._id, email: user.email}, config.development.secret, {
      expiresIn: "30d"
    });

    res.status(200).json({
      token,
      user
    })
  }

  catch(err) {
    console.log(err);
  }
})

module.exports = app;