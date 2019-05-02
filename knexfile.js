// Update with your config settings.
require('dotenv').config()
// const pg = require('pg')
// pg.defaults.ssl = true

const localPg = {
  host: 'localhost',
  database: 'sleep',
  user: 'postgres',
  password: process.env.DATABASE_PASSWORD,
};
// console.log(process.env.DATABASE_PASSWORD)
const productionDbConnection = process.env.DATABASE_URL || localPg;

// process.env.DATABASE_URL

module.exports = {
  development: {
    client: 'pg',
    connection: productionDbConnection,
    migrations: {
      directory: './database/migrations'
    },
    seeds: {
      directory: './database/seeds'
    },
    useNullAsDefault: true
  },

  test: {
    client: 'pg',
    connection:`postgres://postgres:${process.env.DATABASE_PASSWORD}@localhost/wellness-bet-sleep`,
    migrations: {
      directory: './database/migrations'
    },
    seeds: {
      directory: './database/seeds'
    },
    useNullAsDefault: true
  },

  production: {
    client: 'postgresql',
    connection: productionDbConnection,
    migrations: {
      directory: './database/migrations',
    },
    seeds: {
      directory: './database/seeds',
    },
  },
}
