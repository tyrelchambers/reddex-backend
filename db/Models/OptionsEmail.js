import { DataTypes, Deferrable } from 'sequelize'
import { sequelize } from '../index'
import {SubmissionFormOptions} from './SubmissionFormOptions'

const OptionsEmail = sequelize.define("OptionsEmail", {
  uuid: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
    unique: true
  },
  value: DataTypes.STRING,
  label: DataTypes.STRING,
  required: DataTypes.BOOLEAN,
  enabled: DataTypes.BOOLEAN,
  options_id: {
    type: DataTypes.UUID,
    references: {
      model: SubmissionFormOptions,
      key: 'uuid',
      deferrable: Deferrable.INITIALLY_IMMEDIATE
    }
  }
}, {
  tableName: "options_email",
  timestamps: false
})

module.exports = OptionsEmail
