import mongoose from 'mongoose'

const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const websiteSchema = new Schema({
  subdomain: {
    type: String,
    unique: true
  },
  title: String,
  twitter: String,
  facebook: String,
  instagram: String,
  patreon: String,
  youtube: String,
  podcast: String,
  introduction: String,
  submissionForm: Boolean,
  youtubeTimeline: Boolean,
  youtubeId: String,
  twitterTimeline: Boolean,
  twitterId: String,
  bannerURL: {
    type: String,
    default: "https://images.unsplash.com/photo-1513346940221-6f673d962e97?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1650&q=80"
  },
  accent: {
    type: String,
    default: "#000000"
  },
  theme: {
    type: String,
    default: "light"
  },
  user_id: {
    type: ObjectId,
    ref: "User"
  }
}, {
  timestamps: true
})

const Website = mongoose.model('Website', websiteSchema);

module.exports = Website;