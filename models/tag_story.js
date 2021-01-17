"use strict";
const { Deferrable } = require("sequelize");
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class tag_story extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  tag_story.init(
    {
      uuid: {
        type: DataTypes.UUID,
        defaultValue: UUIDV4,
        unique: true,
        primaryKey: true,
      },
      tag_id: {
        type: DataTypes.UUID,
        references: {
          model: Tag,
          key: "uuid",
          deferrable: Deferrable.INITIALLY_IMMEDIATE,
        },
        allowNull: false,
      },
      story_id: {
        type: DataTypes.UUID,
        references: {
          model: Story,
          key: "uuid",
          deferrable: Deferrable.INITIALLY_IMMEDIATE,
        },
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "tag_story",
    }
  );
  return tag_story;
};
