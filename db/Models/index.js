import AuthorsMessaged from './AuthorsMessaged.js'
import Contact from './Contact.js'
import RecentlySearched from './RecentlySearched.js'
import StoriesUsed from './StoriesUsed.js'
import Story from './Story.js'
import SubmissionFormOptions from './SubmissionFormOptions.js'
import Tag from './Tag.js'
import User from './User.js'
import Website from './Website.js'
import TagStory from './TagStory.js'
import OptionsAuthor from './OptionsAuthor'
import OptionsEmail from './OptionsEmail'
import OptionsSentToOthers from './OptionsSentToOthers'
import OptionsTags from './OptionsTags'
import OptionsStoryTitle from './OptionsStoryTitle'

import {sequelize} from '../index.js'

// (async() => {
//   sequelize.sync()
// })()


sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

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

m.User.hasOne(Website, {
  onDelete: 'CASCADE',
  foreignKey: "user_id"
})
m.User.hasMany(AuthorsMessaged, {
  onDelete: 'CASCADE',
  foreignKey: "user_id"

})

m.Tag.belongsToMany(Story, {
  through: TagStory,
  foreignKey: "tag_id"
})

m.Story.belongsToMany(Tag, {
  through: TagStory,
  foreignKey: "story_id"
})

m.Website.belongsTo(User, {
  foreignKey: "user_id"
})

m.Website.hasOne(SubmissionFormOptions, {
  onDelete: 'CASCADE',
  foreignKey: "website_id"
})

m.SubmissionFormOptions.hasOne(OptionsAuthor, {
  onDelete: 'CASCADE',
  foreignKey: "options_id"
})
m.SubmissionFormOptions.hasOne(OptionsEmail, {
  onDelete: 'CASCADE',
  foreignKey: "options_id"
})
m.SubmissionFormOptions.hasOne(OptionsSentToOthers, {
  onDelete: 'CASCADE',
  foreignKey: "options_id"
})
m.SubmissionFormOptions.hasOne(OptionsTags, {
  onDelete: 'CASCADE',
  foreignKey: "options_id"
})
m.SubmissionFormOptions.hasOne(OptionsStoryTitle, {
  onDelete: 'CASCADE',
  foreignKey: "options_id"
})



module.exports = m