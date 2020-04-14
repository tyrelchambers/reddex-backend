
exports.up = function(knex) {
  return knex.schema.createTable("tag_story", t => {
    t.increments("id")
    t.uuid("tag_uuid")
    t.uuid("story_uuid")
    t.foreign("story_uuid").references("stories.uuid").onDelete("CASCADE")
    t.foreign("tag_uuid").references("tags.uuid").onDelete("CASCADE");
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable("tag_story")
};
