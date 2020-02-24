const mongoose = require('mongoose')
const crypto = require('crypto')

var schema = new mongoose.Schema({
  name: { type: String },
  phone: { type: String },
  email: { type: String },
  password: {
    type: String,
    set: value => crypto
                        .createHash('md5')
                        .update(value)
                        .digest('hex')
  },
  createdOn: {
    type: Date,
    'default': Date.now
  },
  updatedAt: { type: Date }
});

var User = mongoose.model("User", schema)