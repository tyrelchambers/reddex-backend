
exports.up = function(knex) {
  return knex.schema.createTable("repeat_gretting", t => {
  t.increments('id')
  t.uuid('uuid')
  t.string('text')
  t.integer('user_id')
  t.foreign('user_id').references('users.id')
})

};

exports.down = function(knex) {
  return knex.schema.dropTable('repeat_gretting')
};
