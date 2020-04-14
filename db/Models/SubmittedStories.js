import { DataTypes, Deferrable } from 'sequelize'
import { sequelize } from '../index'
import User from './User'
const SubmittedStories = sequelize.define("StoriesUsed", {
  uuid: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
    unique: true
  },
  email: {
    type: DataTypes.STRING
  },
  author: {
    type: DataTypes.STRING
  },
  story_title: {
    type: DataTypes.STRING
  },
  sent_to_others: {
    type: DataTypes.BOOLEAN
  },
  tags: {
    type: DataTypes.JSON
  },
  body: {
    type: DataTypes.TEXT
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
  tableName: 'submitted_stories'
})

module.exports = SubmittedStories;