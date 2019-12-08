import mongoose from 'mongoose'

const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId

const contactSchema = new Schema({
  name: String,
  notes: String,
  belongs_to: {
    type: ObjectId,
    ref: "Profile"
  }
})

const Contact = mongoose.model("Contact", contactSchema);

module.exports = Contact;