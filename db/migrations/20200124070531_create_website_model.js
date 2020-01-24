
exports.up = function(knex) {
  return knex.schema.createTable('websites', t => {
      t.increments('id')
      t.uuid('uuid')
      t.string('subdomain').unique()
      t.string('title')
      t.string('twitter')
      t.string('facebook')
      t.string('instagram')
      t.string('patreon')
      t.string('youtube')
      t.string('podcast')
      t.string('introduction')
      t.boolean('submission_form').defaultTo('false')
      t.boolean('youtube_timeline').defaultTo('false')
      t.string('youtube_id')
      t.boolean('twitter_timeline').defaultTo('false')
      t.string('twitter_id')
      t.boolean('show_credit_link').defaultTo('true')
      t.string('banner_url').defaultTo('https://images.unsplash.com/photo-1524721696987-b9527df9e512?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2090&q=80')
      t.string('accent').defaultTo('#000000')
      t.string('theme').defaultTo('light')
      t.integer('user_id').unsigned()
      t.foreign('user_id').references('users.id')
    })
    
};

exports.down = function(knex) {
  return knex.schema.dropTable('websites')
};
