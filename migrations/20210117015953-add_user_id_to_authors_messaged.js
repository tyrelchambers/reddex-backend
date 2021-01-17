"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn("authors_messaged", "user_id", {
      type: Sequelize.UUID,
      references: {
        model: "Users",
        key: "uuid",
      },
      onDelete: "CASCADE",
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn("authors_messaged", "user_id");
  },
};
