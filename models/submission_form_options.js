"use strict";
const { Deferrable } = require("sequelize");
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class submission_form_options extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      SubmissionFormOptions.hasOne(models.OptionsAuthor, {
        onDelete: "CASCADE",
        foreignKey: "options_id",
      });
      SubmissionFormOptions.hasOne(models.OptionsEmail, {
        onDelete: "CASCADE",
        foreignKey: "options_id",
      });
      SubmissionFormOptions.hasOne(models.OptionsSentToOthers, {
        onDelete: "CASCADE",
        foreignKey: "options_id",
      });
      SubmissionFormOptions.hasOne(models.OptionsTags, {
        onDelete: "CASCADE",
        foreignKey: "options_id",
      });
      SubmissionFormOptions.hasOne(models.OptionsStoryTitle, {
        onDelete: "CASCADE",
        foreignKey: "options_id",
      });
    }
  }
  submission_form_options.init(
    {
      uuid: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        unique: true,
      },
      story_title: {
        type: DataTypes.STRING,
      },
      enabled: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      website_id: {
        type: DataTypes.UUID,
        references: {
          model: Website,
          key: "uuid",
          deferrable: Deferrable.INITIALLY_IMMEDIATE,
        },
      },
    },
    {
      sequelize,
      modelName: "submission_form_options",
    }
  );
  return submission_form_options;
};
