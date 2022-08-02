const Koa = require("koa");
const app = new Koa();
const path = require('path')
const routerUser = require('./routes/user');

const routerDevice = require('./routes/device');
const routerLogs = require('./routes/logs')
const mongoose = require('mongoose');
const bodyParser = require('koa-bodyparser');
const dotenv = require('dotenv');
const cors = require('koa-cors');
dotenv.config();
app.use(cors());
mongoose.connect(process.env.MONGO_URL, {
 useNewUrlParser: true,
 useUnifiedTopology: true
}, err => {
 if (err) throw err;
 console.log('Connected to MongoDB')
})

// mongoose.connect('mongodb://localhost/week-3',
//  {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
//  }
// );

// const db = mongoose.connection;
// db.on("error", console.error.bind(console, "connect error"));
// db.once('open', function () {
//  console.log('connect mongoose');
// })

app.use(bodyParser())
app.use(routerUser.routes());
app.use(routerDevice.routes());
app.use(routerLogs.routes());
app.listen(5000, (ctx) => {
 console.log("connect port 5000!")
})