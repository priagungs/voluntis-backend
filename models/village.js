const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const occupationSchema = new Schema({
  name: String,
  percentage: {type: Number, min: 0, max: 100},
  created_at: {type: Date, default: Date.now},
  updated_at: Date
}, {_id: false});

const villageStateSchema = new Schema({
  description: String,
  electricity: Boolean,
  water: Boolean,
  occupations: [occupationSchema],
  uneducated: {type: Number, min: 0, max: 100},
  e_school: {type: Number, min: 0, max: 100},
  j_highschool: {type: Number, min: 0, max: 100},
  s_highschool: {type: Number, min: 0, max: 100},
  university: {type: Number, min: 0, max: 100},
  picture: String,
  group: {type: Schema.Types.ObjectId, ref: 'Group'},
  created_at: {type: Date, default: Date.now},
  updated_at: Date
}, {_id: false});

const villageSchema = new Schema({
  name: String,
  population: {
    type: Number, 
    get: v => Math.round(v),
    set: v => Math.round(v)
  },
  latitude: Number,
  longitude: Number,
  max_volunteer: {
    type: Number, 
    get: v => Math.round(v),
    set: v => Math.round(v)
  },
  village_states: [villageStateSchema]
});

exports.module = mongoose.model('Village', villageSchema);
