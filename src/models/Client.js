const mongoose = require('mongoose');

let ClientSchema = new mongoose.Schema({
  firstName: {type: String},
  lastName: {type: String},
  country: {type: String},
  email: {type: String},
  phone: {type: String},
  regDate: {type: String},
});

module.exports = mongoose.model('Client', ClientSchema);
