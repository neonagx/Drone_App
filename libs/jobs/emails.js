'use strict'
const User      = require('../../models/User')
const nodemailer = require('nodemailer')
const config = {
  user: process.env.DRONEAPP_GMAIL,
  pass: process.env.DRONEAPP_GMAIL_PW
}

const transporter = nodemailer.createTransport(`smtps://${config.user}%40gmail.com:${config.pass}@smtp.gmail.com`)

module.exports = (agenda) => {

  agenda.define('new_session_notification', (job, done) => {

    const data = JSON.parse(job.attrs.data.data)
    const booking = data.booking
    const user = data.user
    const { gide, tour } = booking

    Promise.all([User.findBySessionId({ session }).exec()])

      .then(data => {

        const user = data[0]
        const tour = data[1]

        const mailOptions = {
          from: `"DroneApp" <${config.user}@gmail.com>`,
          to: user.email,
          subject: "You have new session request!",
          text: "You have a new session request",
          html: `<b> Hello from DroneApp!<br/><br/> You have a new session request from ${user.firstName}</b>`
        }

        transporter.sendMail(mailOptions, (err, info) => {
          if(err) return console.log(err)
          console.log('Message sent: ' + info.response)
        })
        done()
      })
      .catch(err => done(err))
  })

  agenda.define('booking_update_notification', (job, done) => {

    const data = JSON.parse(job.attrs.data.data)
    const session = data.session
    const initiator = data.user
    const { status, user } = session
    const userNotification = ['accepted', 'cancelled']
    const query = userNotification.includes(status) ? {_id: user} : { session }

    Promise.all([User.findOne(query).exec(), Tour.findOne({_id: tour}).exec()])
      .then(data => {

        const user = data[0]
        const session = data[1]

        const mailOptions = {
          from: `"DroneApp" <${config.user}@gmail.com>`,
          to: user.email,
          subject: `Your session status changed to ${status}.`,
          text: `Your session status changed to ${status}.`,
          html: `<b> Hello from DroneApp!<br/><br/> The sesion with ${initiator.firstName} is now ${status} </b>`
        }

        transporter.sendMail(mailOptions, (err, info) => {
          if(err) return console.log(err)
          console.log('Message sent: ' + info.response)
        })

        done()
      })

      .catch(err => done(err))
  })

  agenda.define('reset_password_email', (job, done) => {

    const { email, forgotPw } = JSON.parse(job.attrs.data.user)

    const link = `${process.env.CLIENT_URI}/#/reset-password/${forgotPw}`
    const mailOptions = {
      from: `"DroneApp" <${config.user}@gmail.com`,
      to: email,
      subject: `Your Request to Reset Password.`,
      text: `Please click this link: ${link} to reset your password.  Ignore this message if you have not requested a password reset.`,
      html: `<b>Hello from DroneApp<br/><br/>Please click <a href=${link}> here</a> to reset your password in the app.  <br/><br/> Ignore this message if you have not requested to reset a password.  </b>`
    }

    transporter.sendMail(mailOptions, (err, info) => {
      if(err) return console.log(err)
      console.log('Message sent: ' + info.response)
    })

    done()
  })
}
