const jwt = require('jsonwebtoken')
const config = require('../config')
const issueNewVisitorToken = () => {
  const token = jwt.sign({}, config.development.secret);
  return token
}

module.exports = issueNewVisitorToken