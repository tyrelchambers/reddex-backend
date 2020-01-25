
exports.up = function(knex) {
  return knex.schema.table('stories_used', t => {
    t.dropColumn('user_id')
  })
};

exports.down = function(knex) {
  
};
