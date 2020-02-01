import jwt from 'jsonwebtoken';
import config from '../config';
const authHandler = async (req, res, next) => {

  try {
    if ( !req.headers.token ) throw new Error("No token provided");

    const token = req.headers.token;
    
    const userId = await jwt.verify(token, config[config.env].secret, {ignoreExpiration: true}, (err, decoded) => {
      if ( err ) throw new Error(err);
      if ( decoded._id || decoded.id ) {
        throw new Error("Auth token is old. Please sign in again.")
      }
      return decoded.uuid     
    });

    res.locals.userId = userId;
    next();
  }

  catch(err) {
    console.log(err);
    res.status(500).send({err: err.message})
    next(err);
  }
  
}

module.exports = {
  authHandler
}
