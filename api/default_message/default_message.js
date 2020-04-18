import express from 'express'
import { authHandler } from '../../middleware/middleware'

import User from '../../db/Models/User'

const app = express.Router();

app.get('/', authHandler, async (req, res,next) => {
  try {
    const userId = res.locals.userId;

    const message = await User.findOne({
      where: {
        uuid: userId
      }
    }).then(res => res.dataValues)

    res.send(message);
  } catch (err) {
    next(err)
  }
})

app.post('/', authHandler, async (req, res, next) => {
  try {
    const userId = res.locals.userId;
    const text = req.sanitize(req.body.text);

    const message = await User.update({
      initial_message: text
    }, {
      where: {
        uuid: userId

      }
    })
    
    res.send(message);
  }

  catch(err) {
    next(err)
  }
});


module.exports = app;