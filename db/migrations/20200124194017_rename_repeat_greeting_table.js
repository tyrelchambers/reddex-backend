
exports.up = function(knex) {
  return knex.schema.renameTable('repeat_gretting', 'repeat_greeting')
};

exports.down = function(knex) {
  
};
