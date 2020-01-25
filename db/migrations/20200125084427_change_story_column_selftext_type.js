
exports.up = function(knex) {
  return knex.schema.alterTable('stories', t => {
    t.text('self_text', 'longtext').alter();
  })
};

exports.down = function(knex) {
  
};
