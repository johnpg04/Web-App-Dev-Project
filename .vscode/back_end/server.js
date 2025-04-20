const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const PORT = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static('front_end')); // Serve HTML and static files from public/

// In-memory storage: { 'roomNumber|date': [ { start, end } ] }
const bookings = {};

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'front_end', 'services.html'));
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

    if (!bookings[key]) bookings[key] = [];

    // Check for overlaps
    const isOverlapping = bookings[key].some(booking => {
        return (startTime < booking.end && endTime > booking.start);
    });

    if (isOverlapping) {
        return res.status(409).json({
            status: 'declined',
            message: `Room ${room} is not available from ${time} for ${duration} hour(s).`
        });
    }

    // Add new booking
    bookings[key].push({ start: startTime, end: endTime });

    return res.status(200).json({
        status: 'confirmed',
        message: `Room ${room} has been reserved on ${date} from ${time} for ${duration} hour(s).`
    });
});

app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});
