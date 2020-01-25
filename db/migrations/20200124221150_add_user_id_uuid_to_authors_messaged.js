
exports.up = function(knex) {
  return knex.schema.table('authors_messaged', t => {
    t.uuid('user_id')
  })
};

exports.down = function(knex) {
  
};
