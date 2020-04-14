
exports.up = function(knex) {
  return knex.schema.createTable("tag_story", t => {
    t.primary(["tag_uuid", "story_uuid"])
    t.uuid("tag_uuid").notNullable()
    t.uuid("story_uuid").notNullable()
    t.foreign("story_uuid").references("stories.uuid").onDelete("CASCADE")
    t.foreign("tag_uuid").references("tags.uuid").onDelete("CASCADE");
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable("tag_story")
};
