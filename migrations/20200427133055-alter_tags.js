'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction(t => {
      return Promise.all([
        queryInterface.removeConstraint('Tags', 'tags_story_id_foreign', {
          transaction: t
        }),
        queryInterface.removeColumn("Tags", "id", {
          transaction: t
        }),
        queryInterface.removeColumn("Tags", "story_id", {
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
        queryInterface.addConstraint('Tags', ['story_id'], {
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
        queryInterface.addColumn("Tags", "id", Sequelize.INTEGER, {
          transaction: t
        }),
        queryInterface.addColumn("Tags", "story_id", Sequelize.UUID, {
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
