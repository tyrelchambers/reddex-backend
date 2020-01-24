
exports.up = function(knex) {
  return knex.schema.createTableIfNotExists("users", t => {
    t.increments('id')
    t.uuid('uuid')
    t.string('email').unique()
    t.string('password').notNullable()
    t.string('access_token')
    t.string('refresh_token')
    t.string('initial_message')
    t.string('repeat_message')
    t.string('youtube_id')
    t.boolean('is_grandfathered')
    t.json('reddit_profile')
  })

};

exports.down = function(knex) {
  return knex.schema.dropTable('users')
};
