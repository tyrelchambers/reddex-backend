
exports.up = function(knex) {
  return knex.schema.table('contacts', t => {
    t.foreign('user_id').references('users.uuid')
  })
  .table('initial_greeting', t => {
    t.foreign('user_id').references('users.uuid')
  })
  .table('repeat_greeting', t => {
    t.foreign('user_id').references('users.uuid')
  })
  .table('stories', t => {
    t.foreign('user_id').references('users.uuid')
  })
  .table('websites', t => {
    t.foreign('user_id').references('users.uuid')
  })
};

exports.down = function(knex) {
  
};