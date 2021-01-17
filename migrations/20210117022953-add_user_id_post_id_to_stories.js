"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn("stories_used", "user_Id", {
      type: Sequelize.UUID,
      references: {
        model: "Users",
        key: "uuid",
      },
      onDelete: "CASCADE",
    });

    await queryInterface.addColumn("stories_used", "post_id", {
      type: Sequelize.UUID,
      references: {
        model: "Users",
        key: "uuid",
      },
      onDelete: "CASCADE",
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn("stories_used", "user_Id");
    await queryInterface.removeColumn("stories_used", "post_Id");
  },
};
