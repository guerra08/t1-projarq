
exports.up = function(knex) {
    return knex.schema.createTable('teams', (table) => {
        table.increments('id')
        table.string('name').unique().notNullable()
        table.boolean('isValid')
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable('teams')
};
