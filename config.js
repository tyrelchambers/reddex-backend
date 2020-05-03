module.exports = {
  "development": {
    "secret": "my furry cat house",
    "database": "mongodb://localhost/reddex",

  },
  "production": {
    "secret": "my furry cat house"
  },
  "staging": {
    "secret": "my furry cat house"
  },
  "env": process.env.NODE_ENV || "development"
}
