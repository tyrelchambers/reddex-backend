'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction(t => {
      return Promise.all([
        queryInterface.removeConstraint('tags', 'tags_story_id_foreign', {
          transaction: t
        }),
        queryInterface.removeColumn("tags", "id", {
          transaction: t
        }),
        queryInterface.removeColumn("tags", "story_id", {
          transaction: t
        })
      ])
    })
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.createTable('users', { id: Sequelize.INTEGER });
    */
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction(t => {
      return Promise.all([
        queryInterface.addConstraint('tags', ['story_id'], {
          type: 'foreign key',
          name: 'tags_story_id_foreign',
          references: { //Required field
            table: 'stories',
            field: 'uuid'
          },
          onDelete: 'cascade'
        },{
          transaction: t
        }),
        queryInterface.addColumn("tags", "id", Sequelize.INTEGER, {
          transaction: t
        }),
        queryInterface.addColumn("tags", "story_id", Sequelize.UUID, {
          transaction: t
        })
      ])
    })
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */
  }
};
