'use strict'
const Agenda = require('agenda')
const config = require('../config/config')

const agenda = new Agenda({db: {address: config.database}})
const jobTypes = process.env.JOB_TYPES ? process.env.JOB_TYPES.split(',') : []

//require ()()multiply?
jobTypes.forEach((type) => {
  require('./jobs/' + type)(agenda)
})

if(jobTypes.length) {
  agenda.on('ready', () => {
    checkScheduled((jobs) => {
      console.log(`SCHEDULED JOBS: ${jobs.length}`)
      if(!jobs.length)
      agenda.create('complete_sessions').repeatAt('12:00am').save()
      agenda.start()
    })
  })
}

function checkScheduled(callback) {
  agenda.jobs({name: 'complete_bookings'}, (err, jobs) => {
    if(err) console.log(`CHECK SCHEDULED JOBS ERROR: ${err}`)
    callback(jobs)
  })
}

function graceful(){
  agenda.cancel({repeatInterval: {$exists: true, $ne: null}}, (err, numRemoved) => {
    agenda.stop(() => process.exit(0))
  })
}

process.on('SIGTERM', graceful)
process.on('SIGINIT', graceful)
process.on('SIGBREAK', graceful)
process.on('SIGHUP', graceful)

module.exports = agenda
