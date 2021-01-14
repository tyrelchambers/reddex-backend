const AuthorsMessaged = require("./AuthorsMessaged.js");
const Contact = require("./Contact.js");
const RecentlySearched = require("./RecentlySearched.js");
const StoriesUsed = require("./StoriesUsed.js");
const Story = require("./Story.js");
const SubmissionFormOptions = require("./SubmissionFormOptions.js");
const Tag = require("./Tag.js");
const User = require("./User.js");
const Website = require("./Website.js");
const TagStory = require("./TagStory.js");
const OptionsAuthor = require("./OptionsAuthor");
const OptionsEmail = require("./OptionsEmail");
const OptionsSentToOthers = require("./OptionsSentToOthers");
const OptionsTags = require("./OptionsTags");
const OptionsStoryTitle = require("./OptionsStoryTitle");

const sequelize = require("../index.js");
(async () => {
  sequelize.sync();
})();

sequelize
  .authenticate()
  .then(() => {
    console.log("Connection has been established successfully.");
  })
  .catch((err) => {
    console.error("Unable to connect to the database:", err);
  });

const m = sequelize.models;

m.User.hasMany(Contact, {
  onDelete: "CASCADE",
  foreignKey: "user_id",
});

m.User.hasMany(RecentlySearched, {
  onDelete: "CASCADE",
  foreignKey: "user_id",
});

m.User.hasMany(StoriesUsed, {
  onDelete: "CASCADE",
  foreignKey: "user_id",
});

m.User.hasOne(Website, {
  onDelete: "CASCADE",
  foreignKey: "user_id",
});
m.User.hasMany(AuthorsMessaged, {
  onDelete: "CASCADE",
  foreignKey: "user_id",
});

m.Tag.belongsToMany(Story, {
  through: TagStory,
  foreignKey: "tag_id",
});

m.Story.belongsToMany(Tag, {
  through: TagStory,
  foreignKey: "story_id",
});

m.Website.belongsTo(User, {
  foreignKey: "user_id",
});

m.Website.hasOne(SubmissionFormOptions, {
  onDelete: "CASCADE",
  foreignKey: "website_id",
});

m.SubmissionFormOptions.hasOne(OptionsAuthor, {
  onDelete: "CASCADE",
  foreignKey: "options_id",
});
m.SubmissionFormOptions.hasOne(OptionsEmail, {
  onDelete: "CASCADE",
  foreignKey: "options_id",
});
m.SubmissionFormOptions.hasOne(OptionsSentToOthers, {
  onDelete: "CASCADE",
  foreignKey: "options_id",
});
m.SubmissionFormOptions.hasOne(OptionsTags, {
  onDelete: "CASCADE",
  foreignKey: "options_id",
});
m.SubmissionFormOptions.hasOne(OptionsStoryTitle, {
  onDelete: "CASCADE",
  foreignKey: "options_id",
});

module.exports = m;
