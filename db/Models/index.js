import AuthorsMessaged from './AuthorsMessaged'
import Contact from './Contact'
import RecentlySearched from './RecentlySearched'
import StoriesUsed from './StoriesUsed'
import Story from './Story'
import SubmissionFormOptions from './SubmissionFormOptions'
import Tag from './Tag'
import User from './User'
import Website from './Website'

import {sequelize} from '../index'

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
m.User.hasMany(Story,{
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

m.Story.belongsTo(User)

m.Story.belongsToMany(Tag, {through: "TagStory"})
m.Tag.belongsToMany(Story, {through: "TagStory"})

m.Contact.belongsTo(User)

m.Website.belongsTo(User)

m.Website.hasOne(SubmissionFormOptions, {
  onDelete: 'CASCADE'
})

m.SubmissionFormOptions.belongsTo(Website)