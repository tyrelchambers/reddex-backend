
exports.up = function(knex) {
  return knex.schema.alterTable('websites', t => {
    t.text('title').alter();
    t.text('introduction').alter();
    t.text('banner_url').alter();
  })
  .alterTable('users', t => {
    t.text('initial_message').alter();
    t.text('repeat_message').alter();
  })
  .alterTable('contacts', t => {
    t.text('notes').alter();
  })
  .dropTable('repeat_greeting')
  .dropTable('initial_greeting');
};

exports.down = function(knex) {
  
};
