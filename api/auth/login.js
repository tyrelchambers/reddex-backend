import express from 'express';
import User from '../../models/User';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import config from '../../config';

const app = express.Router();

app.post('/login', async (req, res) => {
  try {

    const password = req.sanitize(req.body.password);
    const email = req.sanitize(req.body.email);

    const user = await User.findOne({email});

    const hashPassword = await bcrypt.compareSync(password, user.password);
    if ( !hashPassword ) throw new Error("Email or password do not match");
    const token = jwt.sign({id: user._id, email: user.email}, config.development.secret, {
      expiresIn: "1d"
    });

    res.send({token, user});
  }

  catch(err) { 
    console.log(err);
    res.status(400).send("Email or password are incorrect");
  }
});

module.exports = app;