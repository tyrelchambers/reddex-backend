
exports.up = function(knex) {
  return knex.schema.alterTable('submission_form_options', t => {
    t.dropForeign('website_id')
    t.foreign('website_id').references('websites.uuid')

  })
};

exports.down = function(knex) {
  
};
