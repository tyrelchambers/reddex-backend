"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn("contacts", "user_id", {
      type: Sequelize.UUID,
      references: {
        model: "users",
        key: "uuid",
      },
      onDelete: "CASCADE",
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn("contacts", "user_id");
  },
};
