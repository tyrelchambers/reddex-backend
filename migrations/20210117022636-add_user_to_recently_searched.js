"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn("recently_searched", "user_id", {
      type: Sequelize.UUID,
      references: {
        model: "Users",
        key: "uuid",
      },
      onDelete: "CASCADE",
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn("recently_searched", "user_id");
  },
};
