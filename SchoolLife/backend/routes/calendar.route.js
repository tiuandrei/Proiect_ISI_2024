const { getEvent, getEvents, addEvent, modifyEvent, deleteEvent } = require('../controllers/calendar.controller');
const { userMiddleware, adminMiddleware } = require('../middlewares/middlewares');
const router = require('express').Router();

router.get('/getEvent', userMiddleware, getEvent);
router.get('/getEvents', userMiddleware, getEvents);
router.post('/addEvent', adminMiddleware, addEvent);
router.patch('/modifyEvent', adminMiddleware, modifyEvent);
router.delete('/deleteEvent', adminMiddleware, deleteEvent);

module.exports = router;