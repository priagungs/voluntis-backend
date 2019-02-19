const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const volunteerSchema = new Schema({
  username: {type: String, unique: true},
  password: String,
  email: {type: String, unique: true},
  picture: String,
  ktp: {type: String, unique: true},
  street: String,
  city: String,
  country: String,
  occupation: String,
  created_at: {type: Date, default: Date.now},
  updated_at: Date
});

exports.module = mongoose.model('Volunteer', volunteerSchema);
