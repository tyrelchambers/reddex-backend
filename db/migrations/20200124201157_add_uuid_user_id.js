
exports.up = function(knex) {
  return knex.schema.alterTable('contacts', t => {
    t.uuid('user_id')
  })
  .alterTable('initial_greeting', t => {
    t.uuid('user_id')
  })
  .alterTable('repeat_greeting', t => {
    t.uuid('user_id')
  })
  .alterTable('stories', t => {
    t.uuid('user_id')
  })
  .alterTable('websites', t => {
    t.uuid('user_id')
  })
};

exports.down = function(knex) {
  
};