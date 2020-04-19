import { DataTypes, Deferrable, UUIDV4 } from 'sequelize'
import { sequelize } from '../index.js'
import User from './User.js'

const Tag = sequelize.define("Tag", {
  uuid: {
    type: DataTypes.UUID,
    defaultValue: UUIDV4,
    unique: true,
    primaryKey: true
  },
  tag: {
    type: DataTypes.STRING
  }
}, {
  tableName: 'tags',
  timestamps: false

})

module.exports = Tag