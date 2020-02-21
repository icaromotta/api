const mongoose = require('mongoose')
const Contact = mongoose.model('Contact')

module.exports.contact = (req, res) => {
  Contact.create(req.body, (err, message) => {
    return res.status(200).send({ ok: true })
  })
}