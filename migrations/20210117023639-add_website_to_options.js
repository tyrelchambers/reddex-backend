"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn("submission_form_options", "website_id", {
      type: Sequelize.UUID,
      references: {
        model: "websites",
        key: "uuid",
      },
      onDelete: "CASCADE",
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn("submission_form_options", "website_id");
  },
};
