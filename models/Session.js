'use strict'
const mongoose     = require('mongoose')
const deepPopulate = require('mongoose-deep-populate')(mongoose)
const User         = require('./User')
const Location     = require('./sub_docs/Location')
const Availability = require('./sub_docs/Availability')

const Session = new mongoose.Schema({
  user          : { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  profUser      : { type: mongoose.Schema.Types.ObjectId, ref: 'ProfUser', required: true },
  requests      : [{ type: Number, unique: true }],
  // availability  : Availability,
  status        : { type: Number, default: 0 },
  location      : Location,
  duration      : { type: Number, required: true },
  phone         : { type: String, required: true },
  total         : { type: Number, required: true },
  messageThread : { type: String, ref: 'MessageThread'}
})

module.exports = mongoose.model('Session', Session)
