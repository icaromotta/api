var mongoose = require('mongoose')

var schema = new mongoose.Schema({
  name: { type: String },
  email: { type: String },
  subject: { type: String },
  message: { type: String },
  createdOn: {
    type: Date,
    'default': Date.now
  },
  updatedAt: { type: Date }
});

var Contact = mongoose.model("Contact", schema)