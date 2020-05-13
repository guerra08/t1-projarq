exports.up = function(knex) {
    return knex.schema.createTable('teams_students', (table) => {
        table.increments('id')
        table.integer('student').unsigned().notNullable();
        table.foreign('student').references('id').inTable('students');
        table.integer('team').unsigned().notNullable();
        table.foreign('team').references('id').inTable('teams');
        table.unique(['student', 'team'])
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable('teams_students')
};
