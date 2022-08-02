const Router = require('koa-router');
const { signin, signup, LogOut } = require('../Controllers/user');


const router = Router();

router.post("/signin", signin);
router.post('/signup', signup);
router.get('/logout', LogOut)
module.exports = router