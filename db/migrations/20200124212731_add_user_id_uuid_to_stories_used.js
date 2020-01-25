
exports.up = function(knex) {
  return knex.schema.table('stories_used', t => {
    t.foreign('user_id').references('users.uuid')
    t.uuid('user_id')
  })
};

exports.down = function(knex) {
  
};
