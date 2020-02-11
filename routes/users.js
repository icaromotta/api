const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
var User = mongoose.model("User");

router.post('/create', (req, res) => {
  let user = new User({
    name: req.body.name,
    phone: req.body.phone,
    email: req.body.email,
    password: req.body.password
  });
  user.save((err) => {
    if (err) return handleError(err);
    res.send({ ok: true })
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
