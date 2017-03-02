'use strict'

module.exports = (res, err, data, message) => {
  let status = err ? 400 : 200
  let payload = { status, message }
  if (err) { payload.err = err }
  if (data) { payload.data = data }
  res.send(payload)
}
