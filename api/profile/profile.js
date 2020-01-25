import express from 'express';
import { authHandler } from '../../middleware/middleware';
import bcrypt from 'bcryptjs';
import knex from '../../db/index'
import uuidv4 from 'uuid';

const app = express.Router();

app.get('/auth', authHandler, async (req, res) => {
  try {
    const userId = res.locals.userId;
    const user = await knex('users').where({
      uuid: userId
    }).returning('*')
    
    res.send(user[0]);
  }

  catch(err) {
    console.log(err);
    res.send(400).json({error: err});
  }
});

app.get('/default_message', authHandler, async (req, res) => {
  try {
    const userId = res.locals.userId;

    const message = await knex('initial_greeting').where({
      user_id: userId
    }).returning('*')

    res.send(message);
  } catch (err) {
    console.log(err);
    res.send(400).json({error: err});
  }
})

app.post('/default_message', authHandler, async (req, res) => {
  try {
    const userId = res.locals.userId;
    const defaultMessage = req.sanitize(req.body.defaultMessage);

    const message = await knex('initial_greeting').insert({
      uuid: uuidv4(),
      user_id: userId,
      text: defaultMessage
    }).returning('*')
    
    res.send(message);
  }

  catch(err) {
    console.log(err);
    res.send(400).json({error: err});
  }
});

app.put('/default_message/update', authHandler, async (req, res) => {
  try {
    const userId = res.locals.userId;
    const text = req.sanitize(req.body.text);

    const message = await knex('initial_greeting').where({
      user_id: userId
    }).update({
      text
    }).returning('*')
    
    res.send(message);
  } catch (error) {
    console.log(error)
    res.status(500).send(error.message)
    next(error)
  }
})

// app.post('/alt_message', authHandler, async (req, res) => {
//   try {
//     const userId = res.locals.userId;
//     const altMessage = req.sanitize(req.body.altMessage);

//     const user = await User.findOneAndUpdate({_id: userId}, {altMessage});

//     res.send(user.altMessage);
//   }

//   catch(err) {
//     console.log(err);
//     res.send(400).json({error: err});
//   }
// });

// app.post('/youtube', authHandler, async (req, res) => {
//   try {
//     const user = await User.findOne({_id: res.locals.userId});
//     const youtubeId = req.sanitize(req.body.youtubeId);

//     user.save(err => {
//       if ( err ) throw new Error(err);

//       user.youtubeId = youtubeId;
//       user.save();
//     });

//     res.sendStatus(200);
//   }

//   catch(err) {
//     console.log(err)
//     res.status(500).send(err)
//     next(err)
//   }
// });

// app.put('/update/email', authHandler, async (req, res, next) => {
//   try {

//     const email = req.sanitize(req.body.email);

//     if ( !email ) throw new Error("No email provided");
//     const user = await User.findOneAndUpdate({_id: res.locals.userId}, {email});

//     res.send(user)
//   }

//   catch(err) {
//     console.log(err)
//     res.status(500).send(err)
//     next(err)
//   }
// })

// app.put('/update/password', authHandler, async (req, res) => {
//   try {
//     const newPassword = req.sanitize(req.body.newPassword);
//     const currentPassword = req.sanitize(req.body.currentPassword);

//     if (!newPassword || !currentPassword) throw new Error("No passwords provided");

//     const user = await User.findOne({_id: res.locals.userId});
//     const comparePasswords = await bcrypt.compareSync(currentPassword, user.password);

//     if ( !comparePasswords ) throw new Error("Passwords don't match");

//     const hashNewPassword = await bcrypt.hashSync(newPassword, 10);

//     const newUser = await User.findOneAndUpdate({_id: res.locals.userId}, {password: hashNewPassword});
//     res.sendStatus(newUser)

//   }

//   catch(err) {
//     console.log(err)
//     res.status(500).send(err)
//     next(err)
//   }
// })

// app.delete('/delete', authHandler, async (req, res) => {
//   try {
//     const id = req.sanitize(req.query.id);

//     if ( id !== res.locals.userId) throw new Error("Something went wrong");

//     await User.findOneAndRemove({_id: id});
//     res.send(200)
//   }

//   catch(err) {
//     console.log(err)
//     res.status(500).send(err)
//     next(err)
//   }
// });

app.get('/stories_used', authHandler, async (req, res) => {
  try {
    const id = res.locals.userId;
    const stories = await knex('stories_used').where({user_id: id}).returning('*')

    res.send(stories)
  }

  catch(err) {

  }
})

module.exports = app;