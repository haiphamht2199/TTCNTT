const logs = require('../data/logs.json');
const Logs = require('../Models/logs')
const pamition = (x, Logs, page_size) => {
 var indexPage = x;
 var perPage = page_size;
 var start = (indexPage - 1) * perPage;
 var end = indexPage * perPage;
 const LogArr = Logs.slice(start, end);
 return LogArr;
}
//get logs
exports.getLogs = async (ctx) => {
 var page = parseInt(ctx.request.body.page);
 var page_size = parseInt(ctx.request.body.pageSize);
 let key = ctx.request.body._key;

 page = parseInt(page);
 if (page < 1) {
  page = 1;
 }

 // const datas = logs.Logs;
 // var total = datas.length;
 // const arr = [];
 // datas.map((item, index) => {
 //  if (item.name.indexOf(key) != -1) {
 //   arr.push(item);
 //  }
 // });
 // var numberPage = Math.ceil(total / page_size);
 // const data = pamition(page, arr, page_size);
 // if (data) {
 //  ctx.response.status = 200;
 //  ctx.body = { data, numberPage, page };
 // }

 var sl = (page - 1) * page_size;
 const data = await Logs.find().skip(sl).limit(page_size);
 if (data) {
  var pagerSize = data.length;
  var total = await (await Logs.find()).length;
  var numberPage = Math.ceil(total / pagerSize);
  ctx.response.status = 200;
  ctx.body = { data, numberPage, page };
 }
}
//add logs
exports.add = (ctx) => {
 const { id, name, action, date } = ctx.request.body;
 const newLog = new Logs({
  id: id,
  name: name,
  action: action,
  date: date
 });

 newLog.save();
}