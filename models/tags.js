"use strict";
const { Deferrable } = require("sequelize");
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class tags extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Tag.belongsToMany(models.Story, {
        through: TagStory,
        foreignKey: "tag_id",
      });
    }
  }
  tags.init(
    {
      uuid: {
        type: DataTypes.UUID,
        defaultValue: UUIDV4,
        unique: true,
        primaryKey: true,
      },
      tag: {
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
      modelName: "tags",
    }
  );
  return tags;
};
