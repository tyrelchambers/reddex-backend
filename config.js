require("dotenv").config();

module.exports = {
  development: {
    secret: "my furry cat house",
    database: "mongodb://mongodb/reddex",
  },
  production: {
    secret: "my furry cat house",
    database: `mongodb://mongodb/reddex`,
  },
  staging: {
    secret: "my furry cat house",
    database: `mongodb://${process.env.STAGING_MONGO_USER}:${process.env.STAGING_MONGO_PASSWORD}@ds017636.mlab.com:17636/heroku_49hrvs85`,
  },
  env: process.env.NODE_ENV || "development",
};
