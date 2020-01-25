import express from 'express'
import { authHandler } from '../../middleware/middleware'
import knex from '../../db/index'
import uuidv4 from 'uuid/v4'

const app = express.Router();

app.post('/save', authHandler, async (req, res, next) => {
  try {

    const name = req.sanitize(req.body.name);
    const notes = req.sanitize(req.body.notes);
    const contact = await knex('contacts').insert({
      name,
      uuid: uuidv4(),
      notes,
      user_id: res.locals.userId
    }).returning('*')
 
    res.send(contact[0]);
  }

  catch(err) {
    console.log(err)
    res.send(500, err.message);
    next(err.message)
  }
})

app.get('/all', authHandler, async (req, res, next) => {
  try {
    const contacts = await knex('contacts').where({
      user_id: res.locals.userId
    }).returning('*')
    
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
    const name = req.sanitize(req.body.name);
    const notes = req.sanitize(req.body.notes);
    const uuid = req.sanitize(req.body.uuid);

    const contact = await knex('contacts').where({
      uuid
    })
    .update({
      name,
      notes
    }).returning('*')
    
    res.send(contact[0]);
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

    await knex('contacts').where({uuid: id}).del()
    
    res.sendStatus(200)
  }

  catch(err) {
    console.log(err)
    res.send(500, err.message);
    next(err.message);
  }
})

app.get('/name', authHandler, async ( req, res, next ) => {
  try {
    const {
      name
    } = req.query;
    
    const contact = await Contact.findOne({name, belongs_to: res.locals.userId});
    res.send(contact)
  }

  catch(err) {
    console.log(err)
    res.send(500, err.message);
    next(err.message);
  }
});

module.exports = app;