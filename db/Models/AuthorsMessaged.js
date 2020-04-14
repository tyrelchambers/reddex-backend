import { DataTypes, Deferrable } from 'sequelize'
import {sequelize} from '../index'
import User from './User'

const AuthorsMessaged = sequelize.define("AuthorsMessaged", {
  uuid: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  name: {
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
  tableName: 'authors_messaged'
})

module.exports = AuthorsMessaged