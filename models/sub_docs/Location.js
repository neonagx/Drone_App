const mongoose      = require('mongoose')

const Location = new mongoose.Schema({
  name      : { type: String },
  street    : { type: String },
  unit      : { type: String },
  zip       : { type: String },
  city      : { type: String },
  state     : { type: String, default: 'CA' },
  loc       : { type: [Number], index: '2dsphere' }
}, { _id: false })

module.exports = Location
