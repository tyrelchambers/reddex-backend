
exports.up = function(knex) {
  return knex.schema.alterTable('users', t => {
    t.string("patreon_access_token")
    t.string("patreon_access_expire")
    t.string('patreon_refresh_token')
    t.string('patreon_tier')
    t.boolean('active_patron')
    t.boolean('patreon_connected')
  })
};

exports.down = function(knex) {
  return knex.schema.alterTable("users", t=> {
    t.dropColumn('patreon_access_token')
    t.dropColumn('patreon_tier')
    t.dropColumn('patreon_access_expire')
    t.dropColumn('patreon_refresh_token')
    t.dropColumn('active_patron')
    t.dropColumn('patreon_connected')
  })
};
