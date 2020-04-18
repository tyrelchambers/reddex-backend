import express from 'express';
import jwt from 'jsonwebtoken'
import emailCon from '../../libs/emailConfig'
import config from '../../config'
import bcrypt from 'bcryptjs'
import User from '../../db/Models/User'

const app = express.Router();

app.post("/get_reset_token", async (req, res, next) => {
  try {
    const email = req.sanitize(req.body.email)

    const user = await User.findOne({
      where: {
        email
      }
    }).then(res => res.dataValues)
    
    if (!user) throw new Error("No user exists with that email")
    
    const resetToken = jwt.sign({uuid: user.uuid, email: user.email}, config.development.secret, {
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
    next(err)
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
      return decoded.uuid     
    });

    if ( !password ) throw new Error("No password provided")

    const hashNewPassword = await bcrypt.hashSync(password, 10);

    await User.update({
      password: hashNewPassword
    }, {
      uuid: userId
    }) 
    
    res.send("Password changed successfully")
  }

  catch(err) {
    next(err)
  }
})

module.exports = app;