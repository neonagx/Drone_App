'use strict'
const User      = require('../models/User')
const Session   = require('../models/Session')
const respond = require('../libs/response')

const get = (req, res) => {
  const session = req.query
  console.log('this is sessions', session)
  // let query
  // if(id) {
  //   query = User.findByUserId(id)
  // } else {
  //   query = Session.findById(id)
  // }
  const query = Session.find({ session : req.session._id }).exec()
  query
    .then((data) => {
      const response = id ? {session: data}: {sessions : data}
      respond(res, null, response, `Fetched Session(s) for ${req.currentUser.username}`)
    })
    .catch(err => respond(res, err, null, `Error in retrieving sessions`))
}

const create = (req, res) => {
  const param = req.body
  console.log(param)
  const session = new Session(param)
  session.save()
    .then(session => {
      respond(res, null, { session }, 'Session has been created')
      const data = { session, user: req.currentUser }
    })
    .catch(err => respond(res, err, null, 'Error in creating session'))
}

const update = (req, res) => {
  const updateReq = req.body.updates
  const updates = querySerializer(updateReq, 'update')
  const queryParam = { _id: req.body.id}
  if(updateReq && req.body.id) {
    const query = Session.findOneAndUpdate(queryParam, updates, {new: true})
                .populate('tour')
                .populate('user', 'title image firstName lastName')
                .exec()
    query
      .then((session) => {
        const data = { booking }
        respond(res, null, data, 'Session successfully updated')

      })
      .catch(err => respond(res, err, null, 'Error in updating booking'))
  } else {
    respond(res, 'Wrong request parameters', null, 'Please check for id and update request')
  }
}

module.exports = {get, create, update}
