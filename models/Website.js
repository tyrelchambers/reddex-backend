import mongoose from 'mongoose'

const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const websiteSchema = new Schema({
  subdomain: String,
  title: String,
  twitter: String,
  facebook: String,
  instagram: String,
  patreon: String,
  youtube: String,
  podcast: String,
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
    ref: "Profile"
  }
}, {
  timestamps: true
})

const Website = mongoose.model('Website', websiteSchema);

module.exports = Website;