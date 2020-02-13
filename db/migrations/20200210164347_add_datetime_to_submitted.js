
exports.up = function(knex) {
  return knex.schema.table("submitted_stories", t => {
    t.datetime('created_at').defaultTo(knex.fn.now())
  })
};

exports.down = function(knex) {
  return knex.schema.table("submitted_stories", t => {
    t.dropColumn('created_at')
  })
};
