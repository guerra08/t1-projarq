exports.up = function(knex) {
  return knex.schema.createTable("teams_ratings", (table) => {
      table.increments("id")
      table.integer('team').unsigned().notNullable();
      table.foreign('team').references('id').inTable('teams');
      table.integer('professor').unsigned().notNullable();
      table.foreign('professor').references('id').inTable('professors');
      table.integer('working', 1).notNullable()
      table.integer('process', 1).notNullable()
      table.integer('pitch', 1).notNullable()
      table.integer('innovation', 1).notNullable()
      table.integer('team_formation', 1).notNullable()
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable("teams_ratings")
};
