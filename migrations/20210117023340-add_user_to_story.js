"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn("stories", "user_id", {
      type: Sequelize.UUID,
      references: {
        model: "users",
        key: "uuid",
      },
      onDelete: "CASCADE",
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn("stories", "user_id");
  },
};
