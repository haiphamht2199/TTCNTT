const Router = require('koa-router');
const { addDevice, getDevice, DeleteDevice, getDeviceById, EditDevice } = require('../Controllers/device');
const router = Router();
//add device
router.post('/adddevice', addDevice);
//get devices
router.get('/devices', getDevice);
//delete
router.delete('/deletedevice', DeleteDevice);
//get device by id
router.get('/getDeviceById', getDeviceById);
//edit
router.put('/edit', EditDevice);
module.exports = router;