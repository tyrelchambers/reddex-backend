exports.up = function(knex) {
  return knex.schema.createTable('contacts', t => {
    t.increments('id')
    t.uuid('uuid')
    t.string('name')
    t.string('notes')
    t.integer('user_id').unsigned()
    t.foreign('user_id').references('users.id')
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable('contacts');
};
