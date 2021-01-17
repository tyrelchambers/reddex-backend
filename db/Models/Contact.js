const { DataTypes, Deferrable } = require("sequelize");
const sequelize = require("../index.js");

const User = require("./User.js");

const Contact = sequelize.define(
  "Contact",
  {
    uuid: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      unique: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    notes: {
      type: DataTypes.TEXT,
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
    tableName: "contacts",
    timestamps: false,
  }
);

module.exports = Contact;
