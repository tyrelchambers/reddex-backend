
exports.up = function(knex) {
  return knex.schema.dropTable("tag_story")
};

exports.down = function(knex) {
  
};
