import { DataTypes, Deferrable, UUIDV4 } from 'sequelize'
import { sequelize } from '../index'
import User from './User'

const Tag = sequelize.define("Tag", {
  uuid: {
    type: DataTypes.UUID,
    defaultValue: UUIDV4,
    unique: true,
    primaryKey: true
  },
  tag: {
    type: DataTypes.STRING
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
  tableName: 'tags'
})

module.exports = Tag