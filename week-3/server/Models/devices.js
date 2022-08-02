const mongoose = require('mongoose');

const Devixe = new mongoose.Schema({
 name: {
  type: String,
  required: true
 },
 MacAdress: {
  type: String,
  required: true
 },
 IpAdress: {
  type: String,
  required: true
 },
 date: {
  type: String,
  required: true
 },
 power: {
  type: Number,
  required: true
 }
});
module.exports = mongoose.model('device', Devixe)