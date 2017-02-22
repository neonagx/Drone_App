const mongoose      = require('mongoose')

const Availability  = new mongoose.Schema({
  mon : { am: { type: Boolean }, pm: { type: Boolean } },
  tue : { am: { type: Boolean }, pm: { type: Boolean } },
  wed : { am: { type: Boolean }, pm: { type: Boolean } },
  thu : { am: { type: Boolean }, pm: { type: Boolean } },
  fri : { am: { type: Boolean }, pm: { type: Boolean } },
  sat : { am: { type: Boolean }, pm: { type: Boolean } },
  sun : { am: { type: Boolean }, pm: { type: Boolean } }
}, { _id: false })

module.exports = mongoose.model('Availability', Availability)
