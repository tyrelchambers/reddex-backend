import mongoose from 'mongoose'

const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const viewCountSchema = new Schema({
  views: Number,
  day: {
    type: Date,
    default: Date.now()
  }
})

const ViewCount = mongoose.model("ViewCount", viewCountSchema);

module.exports = ViewCount;