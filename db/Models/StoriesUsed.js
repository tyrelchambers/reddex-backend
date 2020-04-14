import { DataTypes, Deferrable } from 'sequelize'
import { sequelize } from '../index'
import User from './User'
import Story from './Story'

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
  tableName: 'stories_used'
})

module.exports = StoriesUsed