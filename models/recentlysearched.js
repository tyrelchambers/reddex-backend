"use strict";
const { Deferrable } = require("sequelize");
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class RecentlySearched extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  RecentlySearched.init(
    {
      subreddit: {
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
      },
    },
    {
      sequelize,
      modelName: "recently_searched",
    }
  );
  return RecentlySearched;
};
