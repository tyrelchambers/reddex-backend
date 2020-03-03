
exports.up = function(knex) {
  return knex.schema.alterTable('websites', t => {
    t.string('thumbnail')
  })
};

exports.down = function(knex) {
  return knex.schema.alterTable('websites', t => {
    t.dropColumn('thumbnail')
  })
};
