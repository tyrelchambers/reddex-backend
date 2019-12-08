import express from 'express'
import { authHandler } from '../../middleware/middleware'
import Contact from '../../models/Contact'
import User from '../../models/User'

const app = express.Router();

app.post('/save', authHandler, async (req, res, next) => {
  try {
    const {
      name,
      notes
    } = req.body;

    const contact = await Contact.create({name, notes, belongs_to: res.locals.userId});
    await User.findOneAndUpdate({_id: res.locals.userId}, { $push: { contacts: contact._id }});

    res.send(contact);
  }

  catch(err) {
    console.log(err)
    res.send(500, err.message);
    next(err.message)
  }
})

app.get('/all', authHandler, async (req, res, next) => {
  try {
    const contacts = await Contact.find({belongs_to: res.locals.userId});
    res.send(contacts);
  }

  catch(err) {
    console.log(err);
    res.send(500, err.message);
    next(err.message)
  }
});

app.post('/update', authHandler, async (req, res, next) => {
  try {
    const {
      name,
      notes,
      _id
    } = req.body;
    const contact = await Contact.findOneAndUpdate({_id}, {name, notes}, {new: true});
    await User.findOneAndUpdate({_id: res.locals.userId}, { $pull: { contacts: contact._id}});
    res.send(contact);
  }

  catch(err) {
    console.log(err)
    res.send(500, err.message);
    next(err.message)
  }
});

app.delete('/delete', authHandler, async (req, res, next) => {
  try {
    const {
      id
    } = req.query;

    await Contact.findOneAndRemove({_id: id});
    res.sendStatus(200)
  }

  catch(err) {
    console.log(err)
    res.send(500, err.message);
    next(err.message);
  }
})

module.exports = app;