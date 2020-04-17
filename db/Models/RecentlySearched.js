import { DataTypes, Deferrable } from 'sequelize'
import { sequelize } from '../index.js'
import User from './User.js'

const RecentlySearched = sequelize.define("RecentlySearched", {
  uuid: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
    unique: true
  },
  subreddit: {
    type: DataTypes.STRING,
    allowNull: false
  },
  user_id: {
    type: DataTypes.UUID,
    references: {
      model: User,
      key: 'uuid',
      deferrable: Deferrable.INITIALLY_IMMEDIATE
    }
  }
}, {
  tableName: 'recently_searched',
  timestamps: false

})

module.exports = RecentlySearched