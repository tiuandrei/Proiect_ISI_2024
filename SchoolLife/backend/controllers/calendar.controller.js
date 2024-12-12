const Event = require('../models/event.model');

const getEvent = async (req, res) => {
    try {
        const event = await Event.findById(req.body.id);
        res.status(200).send(event);
    } catch (error) {
        res.status(500).send({ message: error });;
    }
}

const getEvents = async (req, res) => {
    try {
        const { startDate, endDate } = req.query;
        const events = await Event.find({
            timestamp: {
                $gte: startDate,
                $lte: endDate
            }
        })
        res.status(200).send(events);
    } catch (error) {
        res.status(500).send({ message: error });;
    }
}

const addEvent = async (req, res) => {
    const { name, timestamp, schedule, location } = req.body;

    try {
        const existingEvent = await Event.findOne({timestamp: timestamp});

        if (existingEvent) {
            return res.status(409).send({ message: 'Timestamp scheduled for an existing event' });
        }

        const event = new Event({name, timestamp, location});
        await event.save();
        return res.status(200).send({ message: 'Event created successfully' });
    } catch (error) {
        res.status(500).send({ message: error });
    }
}

const modifyEvent = async (req, res) => {
    const { id, name, timestamp, location } = req.body;

    try {
        const event = await Event.findOne({id: id});
        if (!event) {
            return res.status(404).send({ message: 'The event with the respective id does not exist' });
        }

        const existingEvent = await Event.findOne({timestamp: timestamp});
        if (existingEvent && existingEvent._id.toString() !== event._id.toString()) {
            return res.status(404).send({ message: 'Timestamp scheduled for an existing event' });
        }

        event.timestamp = timestamp;
        event.location = location;
        event.name = name;
        await event.save();
        return res.status(200).send({ message: 'Event modified successfully' });
    } catch (error) {
        res.status(500).send({ message: error });
        console.error(error);
    }
}

const deleteEvent = async (req, res) => {
    try {
        await Event.deleteOne({_id: req.query.id});
        res.status(200).send({ message: 'Event deleted successfully' });
    } catch (error) {
        res.status(500).send({ message: error });
    }
}

module.exports = {
    getEvent,
    getEvents,
    addEvent,
    modifyEvent,
    deleteEvent
}