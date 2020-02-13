
exports.up = function(knex) {
  return knex.schema.alterTable('websites', t => {
    t.text("rules");
    t.string('headline')
    t.string('submission_title') 
  })
};

exports.down = function(knex) {
  
};
