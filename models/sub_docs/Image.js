'use strict'
const mongoose = require('mongoose')

module.exports = new mongoose.Schema({
  key : { type: String },
  url : { type: String, required: true },
  name: { type: String },
  size: { type: Number }
})
