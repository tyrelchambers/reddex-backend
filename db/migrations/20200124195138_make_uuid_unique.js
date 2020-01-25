exports.up = function(knex) {
  return knex.schema.alterTable('users', t => {
    t.unique('uuid')
  })
};

exports.down = function(knex) {
  
};