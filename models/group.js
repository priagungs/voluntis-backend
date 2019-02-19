const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const groupSchema = new Schema({
  start_date: Date,
  end_date: Date,
  is_active: Boolean,
  participators: [{type: Schema.Types.ObjectId, ref: 'Volunteer'}],
  village: {type: Schema.Types.ObjectId, ref: 'Village'}
});

module.exports = mongoose.model('Group', groupSchema);