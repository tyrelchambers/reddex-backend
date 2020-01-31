import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import config from '../../config';
import knex from '../../db/index'
import uuidv4 from 'uuid/v4'

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
    const existingUser = await knex('users').where({email});

    if (existingUser.length > 0) throw new Error("User already exists");

    const user = await knex('users').insert({
      email,
      uuid: uuidv4(),
      password: hashPassword,
      access_token,
      refresh_token,
      reddit_profile
    }).returning('*')

    const token = jwt.sign({uuid: user[0].uuid, email: user[0].email}, config.development.secret, {
      expiresIn: "1d"
    });
    
    res.status(200).send({
      token,
      user: user[0]
    })
  }

  catch(err) {
    console.log(err);
    res.send(500, err.message)
    next(err.message)
  }
})

module.exports = app;