
exports.up = function(knex) {
  return knex.schema.table("websites", t => {
    t.uuid("options_id").unique();
    t.foreign("options_id").references('websites.uuid').onDelete("CASCADE")
  })
};

exports.down = function(knex) {
  
};
