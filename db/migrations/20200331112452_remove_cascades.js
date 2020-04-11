
exports.up = function(knex) {
  return knex.schema.alterTable("contacts", t => {
    t.dropForeign('user_id')
    t.foreign('user_id').references('users.uuid')
  }).alterTable("websites", t => {
    t.dropForeign('user_id')
    t.foreign('user_id').references('users.uuid')
  }).alterTable("authors_messaged", t => {
    t.dropForeign('user_id')
    t.foreign('user_id').references('users.uuid')
  }).alterTable("stories_used", t => {
    t.dropForeign('user_id')
    t.foreign('user_id').references('users.uuid')
  })
};

exports.down = function(knex) {

};
