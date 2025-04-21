const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static('back_end'));

// In-memory bookings object
const bookings = {}; // Example key: "1|2025-04-21"

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'back_end', 'services.html'));
});

app.post('/reserve', (req, res) => {
    const room = req.body['room-number'];
    const date = req.body['reservation-date'];
    const time = req.body['reservation-time'];
    const duration = parseInt(req.body['duration'], 10);

    if (!room || !date || !time || !duration) {
        return res.status(400).json({ status: 'error', message: 'Incomplete data' });
    }

    const key = `${room}|${date}`;
    const startTime = new Date(`${date}T${time}`);
    const endTime = new Date(startTime.getTime() + duration * 60 * 60 * 1000);

    // Initialize if no bookings yet
    if (!bookings[key]) bookings[key] = [];

    // Check for overlap
    const isOverlapping = bookings[key].some(booking => {
        return startTime < booking.end && endTime > booking.start;
    });

    if (isOverlapping) {
        return res.status(409).json({
            status: 'declined',
            message: `Room ${room} is NOT available on ${date} at ${time}.`
        });
    }

    // Save booking
    bookings[key].push({ start: startTime, end: endTime });

    return res.status(200).json({
        status: 'confirmed',
        message: `✅ Room ${room} booked on ${date} at ${time} for ${duration} hour(s).`,
        bookings: bookings[key]
    });
});

app.listen(PORT, () => {
    console.log(`🚀 Server running at http://localhost:${PORT}`);
});

//npm init -y
//npm install express body-parser
//node server.js

