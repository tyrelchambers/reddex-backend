
exports.up = function(knex) {
  return knex.schema.alterTable('repeat_greeting', t => {
    t.unique('user_id')
  })
};

exports.down = function(knex) {
  
};