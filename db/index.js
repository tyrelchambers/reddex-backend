
const { Sequelize } = require('sequelize');

const environment = process.env.NODE_ENV || 'development'

const development = new Sequelize({
  host: 'localhost',
  dialect: 'postgres',
  database: 'reddex',
  
})

const test = new Sequelize({
  host: 'localhost',
  dialect: 'postgres',
  database: 'reddex_test'
})

const connections = {
  development,
  test
}


module.exports = {
  sequelize: connections[environment]
}

// module.exports = {
//   development: {
//     client: 'pg',
//     connection: 'postgres://localhost/reddex',
//     migrations: {
//       directory: __dirname + '/db/migrations'
//     }
//   },
//   production: {
//     client: 'pg',
//     connection: {
//       host : process.env.PGHOST,
//       user : process.env.PGUSER,
//       database : process.env.PGDATABASE,
//       password: process.env.PGPASSWORD,
//       port: process.env.PGPORT
//     },
//     migrations: {
//       directory: __dirname + '/db/migrations'
//     } 
//   },
//   staging: {
//     client: 'pg',
//     connection: 'postgres://njayiwdbnwsdib:bf3deaff77dde54b4746aa3cc6e44cb3c19d4eed5bd49d58aed365c74823027d@ec2-52-203-98-126.compute-1.amazonaws.com:5432/dbs3ta5tho30ji?ssl=true',
//     migrations: {
//       directory: __dirname + '/db/migrations'
//     }
//   }
// }