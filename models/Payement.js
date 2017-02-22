const mongoose = require('mongoose')
const Session  = require('./Session')
const User     = require('./User')
// const options  = { discriminatorKey: 'kind' }

const Payment  = new mongoose.Schema({
  user    : { type: String, ref: 'User', required: true },
  session : { type: String, ref: 'Session', required: true },
  chargeId: { type: String, required: true },
  earning : { type: Number, required: true }
})

module.exports = mongoose.model('Payment', Payment)
