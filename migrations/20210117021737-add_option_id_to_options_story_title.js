"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn("options_story_title", "user_id", {
      type: Sequelize.UUID,
      references: {
        model: "Users",
        key: "uuid",
      },
      onDelete: "CASCADE",
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn("options_story_title", "user_id");
  },
};
