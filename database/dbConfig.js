const knex = require("knex");
const knexConfig = require("../knexFile.js");

module.exports = knex(knexConfig.development);