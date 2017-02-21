'use strict'
const mongoose = require('mongoose')
const User     = require('./User')

const Review = new mongoose.Schema({
  user       : { type: String, ref: 'User', required: true },
  session    : { type: String, ref: 'Session', required: true},
  rating     : { type: Number, required: true },
  review     : { type: String, required: true }
})

module.exports = mongoose.model('Review', Review)
