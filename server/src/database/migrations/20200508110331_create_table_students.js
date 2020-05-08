
exports.up = function(knex) {
    return knex.schema.createTable('students', (table) => {
        table.increments('id')
        table.string('name').notNullable()
        table.string('code').unique().notNullable()
        table.string('email').unique().notNullable()
        table.string('phone').notNullable()

        table.integer('course').unsigned().notNullable();
        table.foreign('course').references('id').inTable('courses');
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable("students")
};
