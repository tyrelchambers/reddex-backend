"use strict";
const { Deferrable } = require("sequelize");
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class submitted_stories extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  submitted_stories.init(
    {
      uuid: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4(),
        primaryKey: true,
        unique: true,
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
      user_id: {
        type: DataTypes.UUID,
        references: {
          model: sequelize.models.user,
          key: "uuid",
          deferrable: Deferrable.INITIALLY_IMMEDIATE,
        },
      },
    },
    {
      sequelize,
      modelName: "submitted_stories",
    }
  );
  return submitted_stories;
};
