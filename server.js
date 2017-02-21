'use strict'
const express    = require('express')
const bodyParser = require('body-parser')
const cors       = require('cors')
const mongoose   = require('mongoose')
const app        = express()

//Express Use
app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

//Mongoose
mongoose.Promise = global.Promise
mongoose.connect(config.database)

//Terminal Port
app.listen(config.port)
console.log(`listening on port: ${configt.port}`)

//Export
module.exports = app 
