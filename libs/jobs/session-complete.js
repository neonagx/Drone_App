'use strict'
const Session = require('../../models/Session')

module.exports = (agenda) => {

  agenda.define('complete_sessions', (job, done) => {
    Session.findCompletedAndUpdate()
      .then(data => {
        console.log('RUNNING JOB ID: ', job.sttrs._id)
        console.log(`COMPLETED ${data.nModified} SESSIONS`)
        done()
      })
      .catch(err => done(err))
  }
}
