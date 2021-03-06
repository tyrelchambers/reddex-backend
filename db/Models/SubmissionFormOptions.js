const { DataTypes, Deferrable } = require("sequelize");
const sequelize = require("../index.js");

const Website = require("./Website.js");

const SubmissionFormOptions = sequelize.define(
  "SubmissionFormOptions",
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
    tableName: "submission_form_options",
    timestamps: false,
  }
);

module.exports = SubmissionFormOptions;
