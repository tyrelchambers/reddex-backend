const { DataTypes, Deferrable, UUIDV4 } = require("sequelize");
const sequelize = require("../index.js");

const Tag = require("./Tag.js");
const Story = require("./Story.js");

const TagStory = sequelize.define(
  "TagStory",
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
    tableName: "tag_story",
    timestamps: false,
  }
);

module.exports = TagStory;
