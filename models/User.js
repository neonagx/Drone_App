'use strict'
const mongoose = require('mongoose')
const options  = { discriminatorKey: 'kind' }
const Image    = require('./sub_docs/Image')
const bcrypt   = require('bcryptjs')

const User = new mongoose.Schema({
  email     : { type: String, required: true, unique: true },
  password  : { type: String, required: true },
  firstName : { type: String },
  lastName  : { type: String },
  phone     : { type: String },
  image     : Image,
  //TODO: change property to location
  loc: {
    type: [Number],
    index: '2d'
  },
  admin     : { type: Boolean, default: false },
  forgotPw  : { type: String }
}, options)

User.methods.generateHash = (password) => {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null)
}

// const ProfUser = new mongoose.Schema({
//   email     : { type: String, required: true, unique: true },
//   password  : { type: String, required: true },
//   firstName : { type: String },
//   lastName  : { type: String },
//   phone     : { type: String },
//   image     : Image,
//   location  : { type: String },
//   admin     : { type: Boolean, default: false },
//   forgotPw  : { type: String}
// }, options)

module.exports = mongoose.model('User', User)
                // mongoose.model('ProfUser', ProfUser)
