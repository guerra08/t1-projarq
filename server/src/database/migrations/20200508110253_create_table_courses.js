
exports.up = function(knex) {
    return knex.schema.createTable('courses', (table) => {
        table.increments('id')
        table.string('name').unique().notNullable()
        table.integer('building', 2).notNullable()
    }).then(() => {
        return knex('courses').insert([
            {'name': 'Engenharia de Software', 'building': 32},
            {'name': 'Ciência da Computação', 'building': 32},
            {'name': 'Sistemas de Informação', 'building': 32},
            {'name': 'Engenharia da Computação', 'building': 32}
        ])
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable('courses')
};
