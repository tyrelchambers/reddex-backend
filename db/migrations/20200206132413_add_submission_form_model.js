
exports.up = function(knex) {
  return knex.schema.createTable('submission_form_options', t => {
    t.increments('id')
    t.uuid("uuid")
    t.json('author')
    t.json('title')
    t.json('sent_to_others')
    t.json('email')
    t.json('tags')
    t.uuid('website_id')
    t.foreign('website_id').references('websites.uuid').onDelete("CASCADE")
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable('submission_form_options');
};