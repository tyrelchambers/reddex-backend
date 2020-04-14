
exports.up = function(knex) {
  return knex.schema.table("tag_story", t => {
    t.uuid("user_id")
    t.foreign("user_id").references("users.uuid")
  })
};

exports.down = function(knex) {
  return knex.schema.table("tag_story", t => {
    t.dropForeign("user_id")
  })
};
