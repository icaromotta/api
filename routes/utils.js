const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const Contact = mongoose.model("Contact")
const controller = require('../controllers/utils')

router.post('/contact', controller.contact);

module.exports = router;