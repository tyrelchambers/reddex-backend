
require('dotenv').config();

module.exports = {
  development: {
    client: 'pg',
    connection: 'postgres://localhost/reddex',
    migrations: {
      directory: __dirname + '/db/migrations'
    }
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
    client: 'pg',
    connection: process.env.DATABASE_URL
  }
}
  