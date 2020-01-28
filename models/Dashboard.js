import mongoose from 'mongoose';

const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const dashboard = new Schema({
  youtube: Boolean,
  user_id: {
    type: ObjectId,
    ref: "User"
  }
})

const Dashboard = mongoose.model("Dashboard", dashboard);

module.exports = QuickActions;