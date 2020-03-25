
exports.up = function(knex) {
  return knex.schema.createTable('incidents', table => {
    table.increments(); //primary key
    
    table.string('title').notNullable();
    table.string('description').notNullable();
    table.decimal('value').notNullable();
    
    table.string('ong_id').notNullable(); // relacionamento
    table.foreign('ong_id').references('id').inTable('ongs'); // relacionamento
  })
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('incidents')
};
