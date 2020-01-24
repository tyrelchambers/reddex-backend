
exports.up = function(knex) {
  return knex.schema.createTable('stories', t => {
      t.increments('id')
      t.uuid('uuid')
      t.string('author')
      t.string('flair')
      t.integer('num_comments').unsigned()
      t.string('post_id')
      t.string('self_text')
      t.string('title')
      t.integer('ups').unsigned()
      t.string('url')
      t.string('subreddit')
      t.boolean('permission').defaultTo('false')
      t.boolean('read').defaultTo('false')
      t.integer('user_id').unsigned()
      t.foreign('user_id').references('users.id')
    })
};

exports.down = function(knex) {
  return knex.schema.dropTable('stories')
};
