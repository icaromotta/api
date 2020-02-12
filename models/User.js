var mongoose = require('mongoose')

var schema = new mongoose.Schema({
  name: { type: String }, 
  phone: { type: String },
  email: { type: String },
  password: { type: String }
});

var User = mongoose.model("User", schema)````