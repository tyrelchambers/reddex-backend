import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import config from '../../config';
import User from '../../db/Models/User'
const app = express.Router();

app.post('/register', async (req, res, next) => {
  try {
    const email = req.sanitize(req.body.email)
    const password = req.sanitize(req.body.password)
    const access_token = req.sanitize(req.body.access_token)
    const refresh_token = req.sanitize(req.body.refresh_token)
    const reddit_profile = req.body.reddit_profile

    if ( !email || !password ) throw new Error("No email or password provided");

    const hashPassword = bcrypt.hashSync(password, 10);
    const existingUser = await User.findOne({
      where:{ 
        email
      }
    }).then(res => {
      if (res) {
        return res.dataValues
      }
    })

    if (existingUser) throw new Error("User already exists");

    const user = await User.create({
      email,
      password: hashPassword,
      access_token,
      refresh_token,
      reddit_profile
    })

    const token = jwt.sign({uuid: user.uuid, email: user.email}, config.development.secret, {
      expiresIn: "1d"
    });
    
    res.status(200).send({
      token,
      user
     })
  }

  catch(err) {
    next(err)
  }
})

module.exports = app;