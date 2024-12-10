const router = require('express').Router();
const { 
    createAnnouncement, 
    getAnnouncements, 
    getAnnouncement, 
    changeAnnouncement, 
    deleteAnnouncement 
} = require('../controllers/announcement.controller');
const { userMiddleware } = require('../middlewares/middlewares');


router.post('/createAnnouncement', userMiddleware, createAnnouncement);
router.get('/getAnnouncements', getAnnouncements);
router.get('/getAnnouncement/:id', getAnnouncement);
router.patch('/changeAnnouncement/:id', userMiddleware, changeAnnouncement);
router.delete('/deleteAnnouncement/:id', deleteAnnouncement);

module.exports = router;
