"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn("tag_story", "user_id", {
      type: Sequelize.UUID,
      references: {
        model: "users",
        key: "uuid",
      },
      onDelete: "CASCADE",
    });

    await queryInterface.addColumn("tag_story", "tag_id", {
      type: Sequelize.UUID,
      references: {
        model: "tags",
        key: "uuid",
      },
      onDelete: "CASCADE",
    });

    await queryInterface.addColumn("tag_story", "story_id", {
      type: Sequelize.UUID,
      references: {
        model: "stories",
        key: "uuid",
      },
      onDelete: "CASCADE",
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn("tag_story", "user_id");
    await queryInterface.removeColumn("tag_story", "tag_id");
    await queryInterface.removeColumn("tag_story", "story_id");
  },
};
