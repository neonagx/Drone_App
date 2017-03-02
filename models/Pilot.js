'use strict'
const mongoose = require('mongoose')
const Image    = require('./sub_docs/Image')

const Pilot = new mongoose.Schema({
  user      : { type: String, ref: 'User', required: true },
  license   : { type: String },
  expertise : [{ type: Number, unique: true }],
  rating    : { type: Number },
  image     : Image
})

module.exports = mongoose.model('Pilot', Pilot)
