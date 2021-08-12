const jwt = require("jsonwebtoken");
const config = require("../config");
const { v4: uuidv4 } = require('uuid');

const authHandler = async (req, res, next) => {
  try {
    if (!req.headers.token) throw new Error("No token provided");

    const token = req.headers.token;

    const userId = await jwt.verify(
      token,
      config[config.env].secret,
      { ignoreExpiration: true },
      (err, decoded) => {
        if (err) throw new Error(err);
        if (decoded._id || decoded.id) {
          throw new Error("Auth token is old. Please sign in again.");
        }
        return decoded.uuid;
      }
    );

    res.locals.userId = userId;
    next();
  } catch (err) {
    next(err);
  }
};

const visitorHandler = async (req, res, next) => {
  try {
    let token = req.headers.temptoken;

    if (!token) {
      token = uuidv4()
    }

    res.locals.temptoken = token

    next()
  } catch (error) {
    next(error)
  }
}

module.exports = {
  authHandler,
  visitorHandler
};
