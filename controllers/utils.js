const mongoose = require('mongoose')
const Contact = mongoose.model('Contact')

module.exports.contact = (req, res) => {
  Contact.create(req.body, (err, message) => {
    res.send({ ok: true })
  })
}