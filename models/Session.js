'use strict'
const mongoose     = require('mongoose')
const deepPopulate = require('mongoose-deep-populate')(mongoose)
const User         = require('./User')

const Session = new mongoose.Schema({
  user          : { type: String, ref: 'User', required: true },
  lesson        : { type: Boolean, default: false },
  footage       : { type: Boolean, default: false },
  maintenance   : { type: Boolean, default: false },
  status        : { type: String },
  location      : { type: String },
  duration      : { type: Number, required: true },
  phone         : { type: String, required: true },
  total         : { type: Number, required: true },
  messageThread : { type: String, ref: 'MessageThread'}
})

module.exports = mongoose.model('Session', Session)
