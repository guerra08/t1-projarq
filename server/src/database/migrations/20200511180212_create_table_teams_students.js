exports.up = function(knex) {
    return knex.schema.createTable('teams_students', (table) => {
        table.increments('id')
        table.integer('student').unsigned().notNullable();
        table.integer('team').unsigned().notNullable();
        table.unique(['student', 'team'])

        table.foreign('student').references('students.id').onDelete('CASCADE').onUpdate('CASCADE');
        table.foreign('team').references('teams.id').onDelete('CASCADE').onUpdate('CASCADE');
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable('teams_students')
};
