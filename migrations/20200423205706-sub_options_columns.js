'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction(t => {
      return Promise.all([
        queryInterface.removeColumn("submission_form_options", "id", {
          transaction: t
        }),
        queryInterface.removeColumn("submission_form_options", "author", {
          transaction: t
        }),
        queryInterface.removeColumn("submission_form_options", "sent_to_others", {
          transaction: t
        }),
        queryInterface.removeColumn("submission_form_options", "email", {
          transaction: t
        }),
        queryInterface.removeColumn("submission_form_options", "tags", {
          transaction: t
        }),
        queryInterface.addColumn("submission_form_options", "enabled", {
          type: Sequelize.BOOLEAN,
          defaultValue: false
        }, {
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
        queryInterface.addColumn("submission_form_options", "id", Sequelize.STRING, {
          transaction: t
        }),
        queryInterface.addColumn("submission_form_options", "author", Sequelize.STRING, {
          transaction: t
        }),
        queryInterface.addColumn("submission_form_options", "sent_to_others", {
          type:Sequelize.BOOLEAN,
          defaultValue: false
        }, {
          transaction: t
        }),
        queryInterface.addColumn("submission_form_options", "email", Sequelize.STRING, {
          transaction: t
        }),
        queryInterface.addColumn("submission_form_options", "tags", Sequelize.STRING, {
          transaction: t
        }),
        queryInterface.removeColumn("submission_form_options", "enabled", {
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
