const Router = require('koa-router');
const { getLogs, SearchLogs, add } = require('../Controllers/logs');
const router = Router();
//get logs
router.post('/logs', getLogs);
//add log
router.post('/add', add)
module.exports = router;
