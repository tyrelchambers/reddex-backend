
exports.up = function(knex) {
  return knex.schema.createTable("recently_searched", t => {
    t.increments('id')
    t.string("subreddit")
    t.integer("count").unsigned()
    t.uuid("user_id")
    t.foreign("user_id").references("users.uuid").onDelete("CASCADE")
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable("recently_searched")
};
