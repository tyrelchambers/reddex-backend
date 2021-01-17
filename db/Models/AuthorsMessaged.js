const { DataTypes, Deferrable } = require("sequelize");
const sequelize = require("../index.js");

const User = require("./User.js");

const AuthorsMessaged = sequelize.define(
  "AuthorsMessaged",
  {
    uuid: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
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
    tableName: "authors_messaged",
    timestamps: false,
  }
);

module.exports = AuthorsMessaged;
