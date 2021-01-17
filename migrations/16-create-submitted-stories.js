"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("submitted_stories", {
      uuid: {
        type: Sequelize.UUID,
        allowNull: false,
        primaryKey: true,
      },
      email: {
        type: Sequelize.STRING,
      },
      author: {
        type: Sequelize.STRING,
      },
      story_title: {
        type: Sequelize.STRING,
      },
      sent_to_others: {
        type: Sequelize.BOOLEAN,
      },
      tags: {
        type: Sequelize.JSON,
      },
      body: {
        type: Sequelize.TEXT,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("submitted_stories");
  },
};
