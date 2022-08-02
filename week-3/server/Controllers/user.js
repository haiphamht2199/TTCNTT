const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs');
const User = require('../Models/user')
//login
exports.signin = async (ctx, next) => {
 const data = ctx.request.body;
 if (data.name == "john" && data.password == "1234") {
  const token = jwt.sign({
   name: data.name, password: data.password
  }, process.env.JWT_SECRET, { expiresIn: '100d' });
  ctx.response.status = 200;
  ctx.response.body = token
 } else {
  ctx.response.status = 200;
  ctx.response.body = "no";
 }
}
//signup
exports.signup = async (ctx, next) => {
 const { name, password } = ctx.request.body;
 if (name, password) {
  hashPassord = await bcrypt.hash(password, 10);
  const newUser = new User({
   name: name,
   password: hashPassord
  });
  newUser.save();
  ctx.response.status = 200;
  ctx.response.body = newUser
 } else {
  ctx.response.status = 400;
 }
}
exports.LogOut = (ctx) => {
 console.log("ok")
}