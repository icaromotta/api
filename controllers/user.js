const mongoose = require('mongoose')
const jwt = require('../config/jwt')
const User = mongoose.model('User')

module.exports.register = (req, res) => {

  User.findOne({ email: req.body.email }, (err, user) => {

    if (user) {
        return res.status(406).send({ error: 'Este e-mail já está em uso. Tente outro.' })
    }

    User.create(req.body, (err, user) => {

        const token = jwt.sign({ user: user.id })

        return res.status(200).send(readyAuth)
    })
})
}