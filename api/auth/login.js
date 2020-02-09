import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import config from '../../config';
import knex from '../../db/index'

const app = express.Router();

app.post('/login', async (req, res, next) => {
  try {

    const password = req.sanitize(req.body.password);
    const email = req.sanitize(req.body.email);

    const user = await knex('users').where({
      email
    }).returning('*');

    if (!user[0]) throw new Error("User does not exist")
    
    const hashPassword = await bcrypt.compareSync(password, user[0].password);
    if ( !hashPassword ) throw new Error("Incorrect password");
    const token = jwt.sign({uuid: user[0].uuid, email: user[0].email}, config.development.secret, {
      expiresIn: "1d"
    });

    res.send({
      token,
      user: user[0]
    });
  }

  catch(err) { 
    console.log(err);
    next(err)
  }
});

module.exports = app;