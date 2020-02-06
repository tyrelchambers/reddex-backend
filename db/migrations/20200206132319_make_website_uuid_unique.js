
exports.up = function(knex) {
  return knex.schema.alterTable("websites", t => {
    t.uuid('uuid').unique().alter()
  })
};

exports.down = function(knex) {
  
};
