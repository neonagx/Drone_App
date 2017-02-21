'use strict'

const database = process.env.MONGODB_URI || 'mongodb://localhost/droneApp'
const port     = process.env.PORT

module.exports = { database, port }
