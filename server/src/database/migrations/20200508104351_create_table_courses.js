exports.up = function(knex) {
    return knex.schema.createTable('courses', (table) => {
        table.increments('id')
        table.string('name').unique().notNullable()
        table.integer('building', 2).unique().notNullable()
    })
}

exports.down = function(knex) {
    return knex.schema.dropTable('courses')
}