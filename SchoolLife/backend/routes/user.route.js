const { me, allUsers, changeGroup } = require('../controllers/user.controller');
const { userMiddleware, adminMiddleware } = require('../middlewares/middlewares');
const router = require('express').Router();

router.get('/me', userMiddleware, me);
router.get('/allUsers', adminMiddleware, allUsers);
router.patch('/changeGroup', adminMiddleware, changeGroup);

module.exports = router;
