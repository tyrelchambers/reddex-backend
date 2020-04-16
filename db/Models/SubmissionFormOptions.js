import { DataTypes, Deferrable } from 'sequelize'
import { sequelize } from '../index.js'
import Website from './Website.js'

const SubmissionFormOptions = sequelize.define("SubmissionFormOptions", {
  uuid: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
    unique: true
  },
  email: {
    type: DataTypes.JSON
  },
  author: {
    type: DataTypes.JSON
  },
  story_id: {
    type: DataTypes.STRING
  },
  sent_to_others: {
    type: DataTypes.JSON
  },
  tags: {
    type: DataTypes.JSON
  },
  website_id: {
    type: DataTypes.UUID,
    references: {
      model: Website,
      key: 'uuid',
      deferrable: Deferrable.INITIALLY_IMMEDIATE
    }
  }
}, {
  tableName: 'submission_form_options'
})

module.exports = SubmissionFormOptions;