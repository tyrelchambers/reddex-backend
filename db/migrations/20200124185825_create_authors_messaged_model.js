exports.up = function(knex) {
  return knex.schema.createTable('authors_messaged', t => {
    t.increments('id')
    t.string('name')
    t.integer('user_id')
    t.foreign('user_id').references('users.id')
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable('authors_messaged')
};
