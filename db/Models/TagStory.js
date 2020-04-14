import { DataTypes, Deferrable, UUIDV4 } from 'sequelize'
import { sequelize } from '../index'
import User from './User'
import Tag from './Tag'
import Story from './Story'

const TagStory = sequelize.define("TagStory", {
  uuid: {
    type: DataTypes.UUID,
    defaultValue: UUIDV4,
    unique: true,
    primaryKey: true
  },
  tag_uuid: {
    type: DataTypes.UUID,
    references: {
      model: Tag,
      key: "uuid",
      deferrable: Deferrable.INITIALLY_IMMEDIATE
    },
    allowNull: false
  },
  story_uuid: {
    type: DataTypes.UUID,
    references: {
      model: Story,
      key: "uuid",
      deferrable: Deferrable.INITIALLY_IMMEDIATE
    },
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
  tableName: "tag_story"
})

module.exports = TagStory