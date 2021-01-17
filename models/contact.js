"use strict";
const { Deferrable } = require("sequelize");
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Contact extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Contact.init(
    {
      uuid: {
        type: DataTypes.UUID,
        allowNull: false,
        defaultValue: DataTypes.UUIDV4(),
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      user_id: {
        type: DataTypes.UUID,
        references: {
          model: sequelize.models.User,
          key: "uuid",
          deferrable: Deferrable.INITIALLY_IMMEDIATE,
        },
        notes: DataTypes.TEXT,
      },
    },
    {
      sequelize,
      modelName: "contacts",
    }
  );
  return Contact;
};
