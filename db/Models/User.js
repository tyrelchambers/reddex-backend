import { DataTypes } from 'sequelize'
import {sequelize} from '../index.js'

const User = sequelize.define('User', {
  uuid: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
    unique: true
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true
    }
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  access_token: {
    type: DataTypes.STRING,
    allowNull: false
  },
  refresh_token: {
    type: DataTypes.STRING,
    allowNull: false
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
    allowNull: false
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
  }
}, {
  tableName: 'users',
  timestamps: false
})

module.exports = User