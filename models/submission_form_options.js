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
      submission_form_options.hasOne(models.options_author, {
        onDelete: "CASCADE",
        foreignKey: "options_id",
      });
      submission_form_options.hasOne(models.options_email, {
        onDelete: "CASCADE",
        foreignKey: "options_id",
      });
      submission_form_options.hasOne(models.options_sent_to_others, {
        onDelete: "CASCADE",
        foreignKey: "options_id",
      });
      submission_form_options.hasOne(models.options_tags, {
        onDelete: "CASCADE",
        foreignKey: "options_id",
      });
      submission_form_options.hasOne(models.options_story_title, {
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
          model: sequelize.models.Website,
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
