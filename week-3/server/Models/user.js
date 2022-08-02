const mongose = require('mongoose');
const user = mongose.Schema({
 name: {
  type: String,
  required: true
 },
 password: {
  type: String,
  required: true
 }
});
module.exports = mongose.model('user', user)