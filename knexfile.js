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
      host : '127.0.0.1',
      user : process.env.PGUSER,
      database : process.env.PGDATABASE
    },
    migrations: {
      directory: __dirname + '/db/migrations'
    }
  }
}