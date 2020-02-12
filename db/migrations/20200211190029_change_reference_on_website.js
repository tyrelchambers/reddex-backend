
exports.up = function(knex) {
  return knex.schema.alterTable("submission_form_options", t => {
    t.uuid("uuid").unique().alter()
  })
  .table("websites", t => {
    t.dropForeign("options_id")
    t.foreign("options_id").references("submission_form_options.uuid").onDelete("CASCADE")
  })
};

exports.down = function(knex) {
  
};
