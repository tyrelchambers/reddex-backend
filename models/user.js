"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class user extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      User.hasMany(models.Contact, {
        onDelete: "CASCADE",
        foreignKey: "user_id",
      });

      User.hasMany(models.RecentlySearched, {
        onDelete: "CASCADE",
        foreignKey: "user_id",
      });

      User.hasMany(models.StoriesUsed, {
        onDelete: "CASCADE",
        foreignKey: "user_id",
      });

      User.hasOne(models.Website, {
        onDelete: "CASCADE",
        foreignKey: "user_id",
      });
      User.hasMany(models.AuthorsMessaged, {
        onDelete: "CASCADE",
        foreignKey: "user_id",
      });
    }
  }
  user.init(
    {
      uuid: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        unique: true,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: true,
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      access_token: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      refresh_token: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      initial_message: {
        type: DataTypes.STRING,
      },
      repeat_message: {
        type: DataTypes.STRING,
      },
      youtube_id: {
        type: DataTypes.STRING,
      },
      reddit_profile: {
        type: DataTypes.JSON,
        allowNull: false,
      },
      patreon_access_token: {
        type: DataTypes.STRING,
      },
      patreon_access_expire: {
        type: DataTypes.STRING,
      },
      patreon_refresh_token: {
        type: DataTypes.STRING,
      },
      patreon_tier: {
        type: DataTypes.STRING,
      },
      active_patron: {
        type: DataTypes.STRING,
      },
      patreon_connected: {
        type: DataTypes.STRING,
      },
      website_id: DataTypes.UUID,
    },
    {
      sequelize,
      modelName: "user",
    }
  );
  return user;
};
