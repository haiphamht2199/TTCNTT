const Device = require('../Models/devices');
const devies = require('../data/device.json');
//chart
const labels = [
 'TV',
 'Washer',
 'Refigeator',
 'Seling'

];
const backgroundColor = [
 'rgb(255, 99, 132)',
 'rgb(54, 162, 235)',
 'rgb(255, 205, 86)',
 'rgb(255,140,0)'
];
const powers = [50, 60, 80, 100]
//add device
exports.addDevice = async (ctx) => {
 const Devies = devies.Devices;
 const { name, mac, ip, date, power } = ctx.request.body;
 const newDevice = {
  device: name,
  macAdress: mac,
  ip: ip,
  createDate: date,
  power: power
 };
 labels.push(name);
 powers.push(power);
 let background = `rgb(${getRandomInt(255)}, ${getRandomInt(255)},${getRandomInt(255)})`;
 backgroundColor.push(background)
 Devies.push(newDevice);
 ctx.response.status = 200;
 ctx.response.body = { Devies, labels, powers, backgroundColor };
}
function getRandomInt(max) {
 return Math.floor(Math.random() * max);
}
//get device
exports.getDevice = async (ctx) => {
 const Devies = devies.Devices;
 if (Devies) {
  ctx.response.status = 200;
  ctx.response.body = { Devies, labels, powers, backgroundColor };
 }

}
//delete device
exports.DeleteDevice = async (ctx) => {
 const Devies = devies.Devices;
 const id = ctx.query.id;

 if (id) {
  const index = parseInt(id);
  Devies.splice(index, 1);
  labels.splice(index, 1)
  powers.splice(index, 1)
  backgroundColor.splice(index, 1)
  ctx.response.status = 200;
  ctx.response.body = Devies;
 }


}
//edit device
exports.getDeviceById = (ctx) => {
 const Devies = devies.Devices;
 let Device = {};
 var index = ctx.query.id;

 var _index = parseInt(index);
 Device = Devies[_index];
 ctx.response.status = 200;
 ctx.response.body = Device;
}
//save edit
exports.EditDevice = (ctx) => {
 var index = ctx.query.id;
 const Devies = devies.Devices;
 const { name1, mac1, ip1, date1, power1 } = ctx.request.body;

 let Device = {};
 Device = {
  device: name1,
  macAdress: mac1,
  ip: ip1,
  createDate: date1,
  power: power1
 }
 var _index = parseInt(index);
 Devies[_index] = Device;
 labels[_index] = name1;
 powers[_index] = power1;
 ctx.response.status = 200;
 ctx.response.body = { Devies, labels, powers, backgroundColor };
}