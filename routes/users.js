const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const User = mongoose.model("User")
const { sign, verify } = require('../config/jwt')

router.post('/create', (req, res) => {

  // TODO: Mover codigo pra controller
  // TODO: Verificar se user existe

  let user = new User({
    name: req.body.name,
    phone: req.body.phone,
    email: req.body.email,
    password: req.body.password
  });

  const token = sign({ user: user.id })

  user.save((err) => {
    if (err) return handleError(err);
    res.send({
      user,
      token
    })
  });
});

router.post('/login', (req, res) => {

  User.findOne({ email: req.body.email }, (err, user) => {

    if (!user) {
      res.status(400).send({
        ok: false
      })
    }

    if (user.password === req.body.password) {
      return res.status(200).send({ ok: true })
    } else {
      return res.status(200).json({ ok: false })
    }
  })
});

module.exports = router;
