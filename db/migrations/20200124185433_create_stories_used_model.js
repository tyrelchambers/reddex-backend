
exports.up = function(knex) {
  return knex.schema.createTable('stories_used', t => {
    t.increments('id')
    t.string('post_id')
    t.integer('user_id')
    t.foreign('user_id').references('users.id')
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable('stories_used')
};
