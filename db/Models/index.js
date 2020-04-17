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
  onDelete: 'CASCADE'
})
m.User.hasMany(RecentlySearched,{
  onDelete: 'CASCADE'
})

m.User.hasMany(StoriesUsed,{
  onDelete: 'CASCADE'
})
m.User.hasMany(Tag, {
  onDelete: 'CASCADE'
})

m.User.hasOne(Website, {
  onDelete: 'CASCADE'
})
m.User.hasMany(AuthorsMessaged, {
  onDelete: 'CASCADE'
})

m.AuthorsMessaged.belongsTo(User)

m.Story.belongsTo(User, {
  foreignKey: "user_id"
})

m.Story.belongsToMany(Tag, {through: "TagStory"})
m.Tag.belongsToMany(Story, {through: "TagStory"})

m.Contact.belongsTo(User)

m.Website.belongsTo(User)

m.Website.hasOne(SubmissionFormOptions, {
  onDelete: 'CASCADE'
})

m.SubmissionFormOptions.belongsTo(Website)

module.exports = m