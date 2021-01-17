"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("websites", {
      uuid: {
        type: Sequelize.UUID,
        allowNull: false,
        primaryKey: true,
      },
      subdomain: {
        type: Sequelize.STRING,
        unqiue: true,
      },
      title: {
        type: Sequelize.STRING,
      },
      twitter: {
        type: Sequelize.STRING,
      },
      instagram: {
        type: Sequelize.STRING,
      },
      patreon: {
        type: Sequelize.STRING,
      },
      facebook: {
        type: Sequelize.STRING,
      },
      youtube: {
        type: Sequelize.STRING,
      },
      podcast: {
        type: Sequelize.STRING,
      },
      introduction: {
        type: Sequelize.STRING,
      },
      submission_form: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      youtube_timeline: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      youtube_id: {
        type: Sequelize.STRING,
      },
      twitter_timeline: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      twitter_id: {
        type: Sequelize.STRING,
      },
      show_credit_link: {
        type: Sequelize.BOOLEAN,
        defaultValue: true,
      },
      accent: {
        type: Sequelize.STRING,
        defaultValue: "#000",
      },
      theme: {
        type: Sequelize.STRING,
        defaultValue: "light",
      },
      rules: {
        type: Sequelize.TEXT,
      },
      headline: {
        type: Sequelize.STRING,
      },
      submission_title: {
        type: Sequelize.STRING,
      },
      thumbnail: {
        type: Sequelize.STRING,
      },
      banner_url: {
        type: Sequelize.STRING,
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
    await queryInterface.dropTable("websites");
  },
};
