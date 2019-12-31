import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../../models/User';
import config from '../../config';
import Token from '../../models/Tokens';

const app = express.Router();

app.post('/register', async (req, res, next) => {
  try {
    const { email, password, access_token, refresh_token } = req.body;
    if ( !email || !password ) throw new Error("No email or password provided");
    const hashPassword = bcrypt.hashSync(password, 10);
    const existingUser = await User.findOne({email});

    if (existingUser) throw new Error({error: "User already exists"});

    const user = await User.create({
      email,
      password: hashPassword,
      access_token,
      refresh_token
    });
    
    const token = jwt.sign({id: user._id, email: user.email}, config.development.secret, {
      expiresIn: "1d"
    });

    res.status(200).json({
      token,
      user
    })
  }

  catch(err) {
    console.log(err);
    res.send(500, {error: err.message})
    next(err.message)
  }
})

module.exports = app;