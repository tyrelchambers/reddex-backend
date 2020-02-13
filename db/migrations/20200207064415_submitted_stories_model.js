
exports.up = function(knex) {
  return knex.schema.createTable("submitted_stories", t => {
    t.increments("id")
    t.uuid('uuid')
    t.string('author')
    t.string('tags'),
    t.string('story_title')
    t.string('email')
    t.text('body', 'mediumtext')
    t.boolean('sent_to_others')
    t.uuid('sid')
    t.foreign('sid').references('websites.uuid')
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable("submitted_stories")
};
