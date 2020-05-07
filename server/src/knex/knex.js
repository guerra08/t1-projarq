const config = require('../../knexfile')["development"]
module.exports = require('server/src/knex/knex')(config);