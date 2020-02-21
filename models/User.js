var mongoose = require('mongoose')

var schema = new mongoose.Schema({
  name: { type: String },
  phone: { type: String },
  email: { type: String },
  password: { type: String },
  createdOn: {
    type: Date,
    'default': Date.now
  },
  updatedAt: { type: Date }
});

var User = mongoose.model("User", schema)