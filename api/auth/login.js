import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import config from '../../config';
import knex from '../../db/index'

const app = express.Router();

app.post('/login', async (req, res) => {
  try {

    const password = req.sanitize(req.body.password);
    const email = req.sanitize(req.body.email);

    const user = await knex('users').where({
      email
    }).returning('*');

    const hashPassword = await bcrypt.compareSync(password, user[0].password);
    if ( !hashPassword ) throw new Error("Email or password do not match");
    const token = jwt.sign({id: user[0].uuid, email: user[0].email}, config.development.secret, {
      expiresIn: "1d"
    });

    res.send({
      token,
      user: user[0]
    });
  }

  catch(err) { 
    console.log(err);
    res.status(400).send("Email or password are incorrect");
  }
});

module.exports = app;