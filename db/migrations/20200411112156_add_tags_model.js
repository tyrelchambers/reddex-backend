
exports.up = function(knex) {
  return knex.schema.alterTable("stories", t=> {
    t.uuid('uuid').alter()
  }).createTable("tags", t => {
    t.increments('id')
    t.uuid("uuid").unique()
    t.string("tag")
    t.uuid("user_id")
    t.foreign("user_id").references("users.uuid").onDelete("CASCADE")
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable("tags").alterTable("stories", t=> {
    t.uuid('uuid').alter()
  })
};
