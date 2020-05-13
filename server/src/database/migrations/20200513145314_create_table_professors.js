exports.up = function(knex) {
  return knex.schema.createTable("professors", (table) => {
      table.increments('id')
      table.string('name').notNullable()
      table.string('code').notNullable()
      table.string('email').notNullable()
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable("professors")
};
