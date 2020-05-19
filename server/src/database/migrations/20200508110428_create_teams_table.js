
exports.up = function(knex) {
    return knex.schema.createTable('teams', (table) => {
        table.increments('id')
        table.string('name').unique().notNullable()
        table.integer('created_by').notNullable()
        table.foreign('created_by').references('id').inTable('students')
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable('teams')
};
