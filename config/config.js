'use strict'

const database = process.env.MONGODB_URI || 'mongodb://localhost/droneApp'
const port     = process.env.PORT || 3000

module.exports = { database, port }
