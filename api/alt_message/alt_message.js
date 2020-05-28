import express from "express"
import { authHandler } from '../../middleware/middleware'
import User from '../../db/Models/User'

const app = express.Router();

app.post('/', authHandler, async (req, res, next) => {
  try {
    const userId = res.locals.userId;
    const text = req.sanitize(req.body.text);

    await User.update({
      repeat_message: text
    }, {
      where: {
        uuid: userId
      }
    })
    
    res.sendStatus(200);
  }

  catch(err) {
    next(err)
  }
});

app.get('/', authHandler, async (req, res, next) => {
  try {
    const userId = res.locals.userId;

    const message = await User.findOne({
      where: {
        uuid: userId
      }
    }, {
      attributes: ['repeat_message'],
    }).then(res => res.dataValues)

    res.send(message);
  } catch (err) {
    next(err)
  }
})


module.exports = app;