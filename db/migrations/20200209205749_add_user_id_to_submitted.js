
exports.up = function(knex) {
  return knex.schema.table('submitted_stories', t => {
    t.uuid('user_id')
    t.foreign('user_id').references("users.uuid")
  })
};

exports.down = function(knex) {
  
};
