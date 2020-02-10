import express from 'express'
import { authHandler} from '../../middleware/middleware';

const app = express.Router();

app.post('/modules', authHandler, async (req, res, next) => {
  try {
    console.log(req.body)
  }

  catch(err) {

  }
})

module.exports = app;