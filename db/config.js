require('dotenv').config();

module.exports = {
  development: {
    host: 'localhost',
    dialect: 'postgres',
    database: 'reddex',
  },
  production: {
    client: 'pg',
    connection: {
      host : process.env.PGHOST,
      user : process.env.PGUSER,
      database : process.env.PGDATABASE,
      password: process.env.PGPASSWORD,
      port: process.env.PGPORT
    },
    migrations: {
      directory: __dirname + '/db/migrations'
    } 
  },
  staging: {
    host: process.env.STAGING_HOST,
    dialect: 'postgres',
    database: process.env.STAGING_DB,
    username: process.env.STAGING_USERNAME,
    password: process.env.STAGING_PASSWORD,
    ssl: true
  }
}