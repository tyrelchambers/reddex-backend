"use strict";
const { Deferrable } = require("sequelize");
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class website extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Website.belongsTo(models.User, {
        foreignKey: "user_id",
      });

      Website.hasOne(models.SubmissionFormOptions, {
        onDelete: "CASCADE",
        foreignKey: "website_id",
      });
    }
  }
  website.init(
    {
      uuid: {
        type: DataTypes.UUID,
        defaultValue: UUIDV4,
        unique: true,
        primaryKey: true,
      },
      subdomain: {
        type: DataTypes.STRING,
        unqiue: true,
      },
      title: {
        type: DataTypes.STRING,
      },
      twitter: {
        type: DataTypes.STRING,
      },
      instagram: {
        type: DataTypes.STRING,
      },
      patreon: {
        type: DataTypes.STRING,
      },
      facebook: {
        type: DataTypes.STRING,
      },
      youtube: {
        type: DataTypes.STRING,
      },
      podcast: {
        type: DataTypes.STRING,
      },
      introduction: {
        type: DataTypes.STRING,
      },
      submission_form: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      youtube_timeline: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      youtube_id: {
        type: DataTypes.STRING,
      },
      twitter_timeline: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      twitter_id: {
        type: DataTypes.STRING,
      },
      show_credit_link: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
      accent: {
        type: DataTypes.STRING,
        defaultValue: "#000",
      },
      theme: {
        type: DataTypes.STRING,
        defaultValue: "light",
      },
      rules: {
        type: DataTypes.TEXT,
      },
      headline: {
        type: DataTypes.STRING,
      },
      submission_title: {
        type: DataTypes.STRING,
      },
      thumbnail: {
        type: DataTypes.STRING,
      },
      banner_url: {
        type: DataTypes.STRING,
      },
      user_id: {
        type: DataTypes.UUID,
        references: {
          model: User,
          key: "uuid",
          deferrable: Deferrable.INITIALLY_IMMEDIATE,
        },
      },
    },
    {
      sequelize,
      modelName: "website",
    }
  );
  return website;
};
