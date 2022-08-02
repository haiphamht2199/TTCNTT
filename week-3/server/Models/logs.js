const mongoose = require('mongoose');

const Logs = new mongoose.Schema({
 id: {
  type: String,
  required: true
 },
 name: {
  type: String,
  required: true
 },
 action: {
  type: String,
  required: true
 },
 date: {
  type: String,
  required: true
 }
});
module.exports = mongoose.model('logs', Logs)