import express from 'express'
import { authHandler } from '../../middleware/middleware'
import Contact from '../../db/Models/Contact'

const app = express.Router();

app.post('/save', authHandler, async (req, res, next) => {
  try {

    const name = req.sanitize(req.body.name);
    const notes = req.sanitize(req.body.notes);
    const contact = await Contact.create({
      name,
      notes,
      user_id: res.locals.userId
    }).then(res => res.dataValues)
 
    res.send(contact);
  }

  catch(err) {
    next(err)
  }
})

app.get('/all', authHandler, async (req, res, next) => {
  try {
    const contacts = await Contact.findAll({
      where: {
        user_id: res.locals.userId
      }
    })
    
    contacts.map(x => x.dataValues)
    
    res.send(contacts);
  }

  catch(err) {
    next(err)
  }
});

app.get('/name', authHandler, async (req, res, next) => {
  try {
    const {
      name
    } = req.query;
    const contact = await Contact.findOne({
      where: {
        name,
        user_id: res.locals.userId
      }
    }).then(res => {
      if (res) {
        return res.dataValues
      }
    })

    res.send(contact)
  } catch (error) {
    next(error)
  }
})

app.patch('/update', authHandler, async (req, res, next) => {
  try {
    const name = req.sanitize(req.body.name);
    const notes = req.sanitize(req.body.notes);
    const uuid = req.sanitize(req.body.uuid);

    await Contact.update({
      name,
      notes
    }, {
      where: {
        uuid
      }
    })
    
    res.sendStatus(200);
  }

  catch(err) {
    next(err)
  }
});

app.delete('/delete', authHandler, async (req, res, next) => {
  try {
    const {
      id
    } = req.query;

    await Contact.destroy({
      where: {
        uuid: id
      }
    })
        
    res.sendStatus(200)
  }

  catch(err) {
    next(err);
  }
})

app.get('/:id', authHandler, async (req, res, next) => {
  try {
    const {
      id
    } = req.params;

    const contact = await Contact.findOne({
      where: {
        uuid: id,
        user_id: res.locals.userId
      }
    }).then(res => {
      if (res) {
        return res.dataValues
      }
    })

    res.send(contact)
  } catch (error) {
    next(error)
  }
})


module.exports = app;