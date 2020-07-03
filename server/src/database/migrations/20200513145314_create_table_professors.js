exports.up = function(knex) {
  return knex.schema.createTable('professors', (table) => {
      table.increments('id')
      table.string('name').notNullable()
      table.string('code').unique().notNullable()
      table.string('email').unique().notNullable()
  }).then(() => {
      return knex('professors').insert([
          {'name': 'Fulano de Tal', 'code': '001123', 'email': 'fulano@pucrs.br'},
          {'name': 'Roberto Souza', 'code': 'rs0099', 'email': 'rsouza@pucrs.br'},
          {'name': 'Maria Santana', 'code': '5678', 'email': 'santamam@pucrs.br'},
          {'name': 'Vitor Carlos', 'code': '8765', 'email': 'vitorc@pucrs.br'},
      ])
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable("professors")
};
