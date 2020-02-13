
exports.up = function(knex) {
  return knex.schema.table('submission_form_options', t => {
    t.renameColumn("page_title", "story_title")
  })
};

exports.down = function(knex) {
  
};
