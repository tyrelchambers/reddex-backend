import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const tokenSchema = new Schema({
  token: {
    type: String,
    unique: true
  },
  used: {
    type: Boolean,
    default: false
  }
});

const Token = mongoose.model('Token', tokenSchema);

module.exports = Token;