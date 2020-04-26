'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction(t => {
      return Promise.all([
        queryInterface.dropColumn("SubmissionFormOptions", "id", {
          transaction: t
        }),
        queryInterface.dropColumn("SubmissionFormOptions", "author", {
          transaction: t
        }),
        queryInterface.dropColumn("SubmissionFormOptions", "sent_to_others", {
          transaction: t
        }),
        queryInterface.dropColumn("SubmissionFormOptions", "email", {
          transaction: t
        }),
        queryInterface.dropColumn("SubmissionFormOptions", "tags", {
          transaction: t
        }),
        queryInterface.addColumn("SubmissionFormOptions", "enabled", {
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
        queryInterface.addColumn("SubmissionFormOptions", "id", {
          transaction: t
        }),
        queryInterface.addColumn("SubmissionFormOptions", "author", {
          transaction: t
        }),
        queryInterface.addColumn("SubmissionFormOptions", "sent_to_others", {
          transaction: t
        }),
        queryInterface.addColumn("SubmissionFormOptions", "email", {
          transaction: t
        }),
        queryInterface.addColumn("SubmissionFormOptions", "tags", {
          transaction: t
        }),
        queryInterface.dropColumn("SubmissionFormOptions", "enabled", {
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
