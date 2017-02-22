'use strict'
const User      = require('../models/User')
const Session   = require('../models/Session')

const get = (req, res) => {
  const id = req.query.id
  const type = req.query.type
  let query
  if(id) {
    query = User.findByUserId(id)
  } else {
    query = Session.findBySessionId(id)
  }
  query
    .then((data) => {
      const response = id ? {session: data}: {sessions : data}
      respond(res, null, response, `Fetched Session(s) for ${req.currentUser.username}`)
    })
    .catch(err => respond(res, err, null, `Error in retrieving  ${type} sessions`))
}

const create = (req, res) => {
  const param = req.body
  param.user = req.currentUser._id
  const session = new Session(param)
  session.save()
    .then(session => {
      respond(res, null, { sesssion }, 'Session has been created')
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
