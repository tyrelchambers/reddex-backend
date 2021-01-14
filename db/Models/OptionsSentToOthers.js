const { DataTypes, Deferrable } = require("sequelize");
const sequelize = require("../index.js");
const { SubmissionFormOptions } = require("./SubmissionFormOptions");

const OptionsSentToOthers = sequelize.define(
  "OptionsSentToOthers",
  {
    uuid: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      unique: true,
    },
    value: {
      type: DataTypes.STRING,
      defaultValue: "",
    },
    label: {
      type: DataTypes.STRING,
      defaultValue: "Sent To Others",
    },
    required: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    enabled: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    options_id: {
      type: DataTypes.UUID,
      references: {
        model: SubmissionFormOptions,
        key: "uuid",
        deferrable: Deferrable.INITIALLY_IMMEDIATE,
      },
    },
  },
  {
    tableName: "options_sent_to_others",
    timestamps: false,
  }
);

module.exports = OptionsSentToOthers;
