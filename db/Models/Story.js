const { DataTypes, Deferrable } = require("sequelize");
const sequelize = require("../index.js");

const User = require("./User.js");

const Story = sequelize.define(
  "Story",
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
    tableName: "stories",
    timestamps: false,
  }
);

module.exports = Story;
