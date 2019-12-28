import express from 'express';
import {authHandler} from '../../middleware/middleware'
import { upload, deleteObject } from '../../libs/aws';

const anyUpload = upload.any();

const app = express.Router();

app.post('/save', authHandler, (req, res) => {
  anyUpload(req, res, (err) => {
    if (err) {
      return res.status(422).send({errors: [{title: 'Image Upload Error', detail: err.message}] });
    }
    for ( let i = 0; i < req.files.length; i++ ) {
      res.send(req.files[i].location);
    }
  });

});

app.delete('/revert', authHandler, async (req, res) => {
  try {
    const {
      url
    } = req.query;
    await deleteObject(url);

    res.sendStatus(200);
  }

  catch(err) {
    console.log(err)
  }
});


module.exports = app;