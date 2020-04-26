import { DataTypes, Deferrable } from 'sequelize'
import sequelize from '../index.js'
import {SubmissionFormOptions} from './SubmissionFormOptions'

const OptionsTags = sequelize.define("OptionsTags", {
  uuid: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
    unique: true
  },
  value: {
    type: DataTypes.STRING,
    defaultValue: ""
  },
  label: {
    type: DataTypes.STRING,
    defaultValue: "Tags"
  },
  required: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  },
  enabled: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  },
  options_id: {
    type: DataTypes.UUID,
    references: {
      model: SubmissionFormOptions,
      key: 'uuid',
      deferrable: Deferrable.INITIALLY_IMMEDIATE
    }
  }
}, {
  tableName: "options_tags",
  timestamps: false
})

module.exports = OptionsTags
