"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("submitted_stories", {
      uuid: {
        type: Sequelize.UUID,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      email: {
        type: DataTypes.STRING,
      },
      author: {
        type: DataTypes.STRING,
      },
      story_title: {
        type: DataTypes.STRING,
      },
      sent_to_others: {
        type: DataTypes.BOOLEAN,
      },
      tags: {
        type: DataTypes.JSON,
      },
      body: {
        type: DataTypes.TEXT,
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
