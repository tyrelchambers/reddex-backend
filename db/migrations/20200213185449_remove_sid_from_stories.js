
exports.up = function(knex) {
  return knex.schema.table("submitted_stories", t => {
    t.dropForeign("sid")
    t.dropColumn("sid")
  })
};

exports.down = function(knex) {
  
};
