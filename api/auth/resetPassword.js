import express from 'express';
import jwt from 'jsonwebtoken'
import User from '../../models/User'
import emailCon from '../../libs/emailConfig'
import config from '../../config'
import bcrypt from 'bcryptjs'
const app = express.Router();

app.post("/get_reset_token", async (req, res, next) => {
  try {
    const email = req.sanitize(req.body.email)

    const user = await User.findOne({email});

    if (!user) throw new Error("No user exists with that email")
    
    const resetToken = jwt.sign({id: user._id, email: user.email}, config.development.secret, {
      expiresIn: "1d"
    });

    emailCon
      .send({
        template: 'resetPassword',
        message: {
          to: user.email
        },
        locals: {
          resetToken
        }
      })
      .then()
      .catch(console.error);
  }

  catch(err) {
    console.log(err)
    next(err.message)
    res.status(500).send(err.message)
  }
});

app.post('/', async (req, res, next) => {
  try {
    const {
      password,
      code
    } = req.body;

    const userId = await jwt.verify(code, config[config.env].secret, (err, decoded) => {
      if ( err ) throw new Error(err);
      return decoded.id     
    });

    if ( !password ) throw new Error("No password provided")

    const hashNewPassword = await bcrypt.hashSync(password, 10);

    await User.findOneAndUpdate({_id: userId}, {password: hashNewPassword});

    res.send("Password changed successfully")
  }

  catch(err) {
    console.log(err)
    next(err.message)
    res.status(500).send(err.message)
  }
})

module.exports = app;