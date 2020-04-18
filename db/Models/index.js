import AuthorsMessaged from './AuthorsMessaged.js'
import Contact from './Contact.js'
import RecentlySearched from './RecentlySearched.js'
import StoriesUsed from './StoriesUsed.js'
import Story from './Story.js'
import SubmissionFormOptions from './SubmissionFormOptions.js'
import Tag from './Tag.js'
import User from './User.js'
import Website from './Website.js'

import {sequelize} from '../index.js'

// (async() => {
//   sequelize.sync()
// })()

const m = sequelize.models

m.User.hasMany(Contact,{
  onDelete: 'CASCADE',
  foreignKey: 'user_id'
})

m.User.hasMany(RecentlySearched,{
  onDelete: 'CASCADE',
  foreignKey: "user_id"
})

m.User.hasMany(StoriesUsed,{
  onDelete: 'CASCADE',
  foreignKey: "user_id"
})
m.User.hasMany(Tag, {
  onDelete: 'CASCADE',
  foreignKey: 'user_id'
})

m.User.hasOne(Website, {
  onDelete: 'CASCADE',
  foreignKey: "user_id"
})
m.User.hasMany(AuthorsMessaged, {
  onDelete: 'CASCADE'
})

m.User.hasMany(Story, {
  foreignKey: 'user_id',
  onDelete:"CASCADE"
})

m.AuthorsMessaged.belongsTo(User)

m.Story.belongsToMany(Tag, {through: "TagStory"})
m.Tag.belongsToMany(Story, {through: "TagStory"})


m.Contact.belongsTo(User, {
  foreignKey: "user_id"
})

m.Website.belongsTo(User, {
  foreignKey: "user_id"
})

m.Website.hasOne(SubmissionFormOptions, {
  onDelete: 'CASCADE',
  foreignKey: "website_id"
})

m.SubmissionFormOptions.belongsTo(Website, {
  foreignKey: 'website_id'
})

module.exports = m