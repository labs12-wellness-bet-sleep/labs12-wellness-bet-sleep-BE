// Update with your config settings.
require('dotenv').config()
// const pg = require('pg')
// pg.defaults.ssl = true

const localPg = {
  host: process.env.DATABASE_HOST,
  database: process.env.DATABASE,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
};
const productionDbConnection = process.env.DATABASE_URL || localPg;

module.exports = {
  development: {
    client: 'pg',
    connection: process.env.DATABASE_URL,
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
    connection:`postgres://postgres:${process.env.DATABASE_PASSWORD}@localhost/sleepbetdb_test`,
    migrations: {
      directory: './database/migrations'
    },
    seeds: {
      directory: './database/seeds'
    },
    useNullAsDefault: true
  },

  production: {
    client: 'pg',
    connection: productionDbConnection,
    migrations: {
      directory: './database/migrations',
    },
    seeds: {
      directory: './database/seeds',
    },
  },
}
