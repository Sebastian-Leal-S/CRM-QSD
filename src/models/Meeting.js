const mongoose = require('mongoose');

let MeetingSchema = new mongoose.Schema(
  {
    __id_client: String,
    date: String,
    description: String,
    status: String,
  },
  {
    versionKey: false,
  }
);

module.exports = mongoose.model('Meeting', MeetingSchema);
