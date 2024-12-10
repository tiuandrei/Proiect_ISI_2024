const mongoose = require('mongoose');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const authRoutes = require('./routes/auth.route');
const userRoutes = require('./routes/user.route');
const calendarRoutes = require('./routes/calendar.route');
const announcementRoutes = require('./routes/announcement.route');
require('dotenv').config();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);
app.use('/api/calendar', calendarRoutes);
app.use('/api/announcement', announcementRoutes);


mongoose.connect(process.env.MONGO_URI).then(() => {
    console.log('Connected to MongoDB');
})

app.listen(process.env.PORT, () => {
    console.log('Server is running on port ' + process.env.PORT);
});

