import { DataTypes, Deferrable } from 'sequelize'
import { sequelize } from '../index.js'
import User from './User.js'
import Story from './Story.js'

const StoriesUsed = sequelize.define("StoriesUsed", {
  uuid: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
    unique: true
  },
  user_id: {
    type: DataTypes.UUID,
    references: {
      model: User,
      key: 'uuid',
      deferrable: Deferrable.INITIALLY_IMMEDIATE
    }
  },
  post_id: {
    type: DataTypes.UUID,
    references: {
      model: Story,
      key: 'uuid',
      deferrable: Deferrable.INITIALLY_IMMEDIATE
    }
  }
}, {
  tableName: 'stories_used',
  timestamps: false

})

module.exports = StoriesUsed