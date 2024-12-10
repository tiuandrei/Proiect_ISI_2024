const AnnouncementSchema = require('../models/announcement.model');

const createAnnouncement = async (req, res) => {
    try {
        const { title, content } = req.body;
        const timestamp = Date.now();
        const user = req.user;
        const announcement = new AnnouncementSchema({
            title,
            timestamp,
            content,
            user : user._id,
        });
        await announcement.save();
        return res.status(201).send(announcement);
    } catch (error) {
        res.status(500).send({ message: error });
    }
}

const getAnnouncements = async (req, res) => {
    try {
        const announcements = await AnnouncementSchema.find();
        announcements.sort((a, b) => b.timestamp - a.timestamp);
        await AnnouncementSchema.populate(announcements, { path: 'user', select: 'name' });
        return res.status(200).send(announcements);
    } catch (error) {
        res.status(500).send({ message: error });
    }
}

const getAnnouncement = async (req, res) => {
    try {
        const announcement = await AnnouncementSchema.findById(req.params.id);
        if (!announcement) {
            return res.status(404).send({ message: 'Announcement not found' });
        }
        await AnnouncementSchema.populate(announcement, { path: 'user', select: 'name' });
        return res.status(200).send(announcement);
    } catch (error) {
        res.status(500).send({ message: error });
    }
}

const changeAnnouncement = async (req, res) => {
    try {;
        const user = req.user;
        const announcement = await AnnouncementSchema.findById(req.params.id);
        if (!announcement) {
            return res.status(404).send({ message: 'Announcement not found' });
        }
        if (!announcement.user.equals(user._id) && !user.isAdmin) {
            return res.status(403).send({ message: 'You can\'t modify others announcements' });
        }
        const title = req.body.title || announcement.title;
        const content = req.body.content || announcement.content;
        announcement.title = title;
        announcement.content = content;
        await announcement.save();
        return res.status(200).send(announcement);
    } catch (error) {
        res.status(500).send({ message: error});
    }
}

const deleteAnnouncement = async (req, res) => {
    try {
        const user = req.user;
        const announcement = await AnnouncementSchema.findById(req.params.id);
        if (!announcement) {
            return res.status(404).send({ message: 'Announcement not found' });
        }
        if (!announcement.user.equals(user._id) && !user.isAdmin) {
            return res.status(403).send({ message: 'You can\'t delete others announcements' });
        }
        await announcement.delete();
        return res.status(200).send({ message: 'Announcement deleted' });
    } catch (error) {
        res.status(500).send({ message: error });
    }
}

module.exports = { createAnnouncement, getAnnouncements, getAnnouncement, changeAnnouncement, deleteAnnouncement };