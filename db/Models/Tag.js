const { DataTypes, Deferrable, UUIDV4 } = require("sequelize");
const sequelize = require("../index.js");

const User = require("./User.js");

const Tag = sequelize.define(
  "Tag",
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
    tableName: "tags",
    timestamps: false,
  }
);

module.exports = Tag;
