require("dotenv").config();

module.exports = {
  development: {
    database: process.env.POSTGRES_DB,
    host: "reddex_db",
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    dialect: "postgres",
    port: 5432,
  },
  production: {
    dialect: "postgres",
    host: "reddex",
    username: process.env.POSTGRES_USER,
    database: process.env.POSTGRES_DB,
    password: process.env.POSTGRES_PASSWORD,
    port: "5432",
    logging: false,
  },
  staging: {
    host: process.env.STAGING_HOST,
    dialect: "postgres",
    database: process.env.STAGING_DB,
    username: process.env.STAGING_USERNAME,
    password: process.env.STAGING_PASSWORD,
    ssl: true,
  },
};
