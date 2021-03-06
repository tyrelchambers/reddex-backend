const { DataTypes, Deferrable } = require("sequelize");
const sequelize = require("../index.js");

const User = require("./User.js");

const RecentlySearched = sequelize.define(
  "RecentlySearched",
  {
    subreddit: {
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
    tableName: "recently_searched",
    timestamps: false,
  }
);

module.exports = RecentlySearched;
