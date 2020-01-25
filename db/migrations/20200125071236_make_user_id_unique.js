
exports.up = function(knex) {
  return knex.schema.alterTable('initial_greeting', t => {
    t.unique('user_id')
  })
};

exports.down = function(knex) {
  
};