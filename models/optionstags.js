"use strict";
const { Deferrable } = require("sequelize");
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class OptionsTags extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  OptionsTags.init(
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
        defaultValue: "Tags",
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
          model: sequelize.models.SubmissionFormOptions,
          key: "uuid",
          deferrable: Deferrable.INITIALLY_IMMEDIATE,
        },
      },
    },
    {
      sequelize,
      modelName: "options_tags",
    }
  );
  return OptionsTags;
};
