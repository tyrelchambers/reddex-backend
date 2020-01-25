
exports.up = function(knex) {
  return knex.schema.table('contacts', t => {
    t.dropForeign('user_id')
  })
  .table('initial_greeting', t => {
    t.dropForeign('user_id')
  })
  .table('repeat_gretting', t => {
    t.dropForeign('user_id')
  })
  .table('stories', t => {
    t.dropForeign('user_id')
  })
  .table('websites', t => {
    t.dropForeign('user_id')
  })
};

exports.down = function(knex) {
  
};
