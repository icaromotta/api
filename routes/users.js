const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const User = mongoose.model("User")
const { sign, verify } = require('../config/jwt')

const authMiddleware = async (req, res, next) => {

  const [token] = req.headers.authorization.split(' ')
  
  try {

    const payload = await verify(token)
    const user = await User.findById(payload.user)

    req.auth = user

    if(!user) {
      res.send(401)
    }

    next()
  } catch (error) {
    res.send(error)
  }
}

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
})

router.get('/login', (req, res) => {

  const [hashType, hash] = req.headers.authorization.split(' ')
  const [email, password] = Buffer.from(hash, 'base64').toString().split(':')
  
  User.findOne({ email: email }, (err, user) => {

    if (!user) {
      res.status(400).send({
        ok: false
      })
    }

    const token = sign({ user: user.id })

    if (user.password === password) {
      return res.status(200).send({ user, token })
    } else {
      return res.status(200).json({ ok: false })
    }
  })
})

router.get('/users', authMiddleware, async (req, res) => {

  try {
    const users = await User.find()
    res.send(users)
  } catch (error) {
    res.send(error)
  }
})

router.get('/me', authMiddleware, (req, res) => {
  res.send(req.auth)
})

module.exports = router;
