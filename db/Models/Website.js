import { DataTypes, Deferrable, UUIDV4 } from 'sequelize'
import { sequelize } from '../index.js'
import User from './User.js'

const Website = sequelize.define("Website", {
  uuid: {
    type: DataTypes.UUID,
    defaultValue: UUIDV4,
    unique: true,
    primaryKey: true
  },
  subdomain: {
    type: DataTypes.STRING,
    unqiue: true
  },
  title: {
    type: DataTypes.STRING
  },
  twitter: {
    type: DataTypes.STRING
  },
  instagram: {
    type: DataTypes.STRING
  },
  patreon: {
    type: DataTypes.STRING
  },
  youtube: {
    type: DataTypes.STRING
  },
  podcast: {
    type: DataTypes.STRING
  },
  introduction: {
    type: DataTypes.STRING
  },
  submission_form: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  youtube_timeline: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  youtube_id: {
    type: DataTypes.STRING
  },
  twitter_timeline: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  twitter_id: {
    type: DataTypes.STRING
  },
  show_credit_link: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  },
  accent: {
    type: DataTypes.STRING,
    defaultValue: "#000"
  },
  theme: {
    type: DataTypes.STRING,
    defaultValue: "light"
  },
  rules: {
    type: DataTypes.TEXT
  },
  headline: {
    type: DataTypes.STRING
  },
  submission_title: {
    type: DataTypes.STRING
  },
  thumbnail: {
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
  tableName: 'websites'
})

module.exports = Website;