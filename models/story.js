"use strict";
const { Deferrable } = require("sequelize");
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class story extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Story.belongsToMany(models.Tag, {
        through: TagStory,
        foreignKey: "story_id",
      });
    }
  }
  story.init(
    {
      uuid: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        unique: true,
      },
      author: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      flair: {
        type: DataTypes.STRING,
      },
      num_comments: {
        type: DataTypes.INTEGER,
      },
      post_id: {
        type: DataTypes.STRING,
      },
      self_text: {
        type: DataTypes.TEXT,
      },
      title: {
        type: DataTypes.STRING,
      },
      ups: {
        type: DataTypes.INTEGER,
      },
      url: {
        type: DataTypes.STRING,
      },
      subreddit: {
        type: DataTypes.STRING,
      },
      permission: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      read: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
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
      modelName: "stories",
    }
  );
  return story;
};
