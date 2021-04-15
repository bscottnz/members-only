var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var UserSchema = new Schema({
  username: { type: String, required: true, maxLength: 20 },
  password: { type: String, required: true },
  membership_status: { type: String, required: true },
});

//Export model
module.exports = mongoose.model('User', UserSchema);
