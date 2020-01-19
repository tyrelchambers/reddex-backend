import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../../models/User';
import config from '../../config';
import Token from '../../models/Tokens';

const app = express.Router();

app.post('/register', async (req, res, next) => {
  try {
    const email = req.sanitize(req.body.email)
    const password = req.sanitize(req.body.password)
    const access_token = req.sanitize(req.body.access_token)
    const refresh_token = req.sanitize(req.body.refresh_token)

    if ( !email || !password ) throw new Error("No email or password provided");
    const hashPassword = bcrypt.hashSync(password, 10);
    const existingUser = await User.findOne({email});

    if (existingUser) throw new Error("User already exists");

    const user = await User.create({
      email,
      password: hashPassword,
      access_token,
      refresh_token
    });
    
    const token = jwt.sign({id: user._id, email: user.email}, config.development.secret, {
      expiresIn: "1d"
    });

    res.status(200).send({
      token,
      user
    })
  }

  catch(err) {
    console.log(err);
    res.send(500, err.message)
    next(err.message)
  }
})

module.exports = app;