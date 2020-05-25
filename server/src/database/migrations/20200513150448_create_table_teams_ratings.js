exports.up = function(knex) {
  return knex.schema.createTable("teams_ratings", (table) => {
      table.increments("id")
      table.integer('team').unsigned().notNullable();
      table.integer('professor').unsigned().notNullable();
      table.integer('working', 1).notNullable()
      table.integer('process', 1).notNullable()
      table.integer('pitch', 1).notNullable()
      table.integer('innovation', 1).notNullable()
      table.integer('team_formation', 1).notNullable()
      table.unique(['professor', 'team'])

      table.foreign('professor').references('professors.id').onDelete('CASCADE').onUpdate('CASCADE');
      table.foreign('team').references('teams.id').onDelete('CASCADE').onUpdate('CASCADE');
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable("teams_ratings")
};
