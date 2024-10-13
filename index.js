const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();
const port = 3001;

// Log email opens
app.get('/track', (req, res) => {
    const ip = req.ip; // Get the client's IP address
    const userAgent = req.get('User-Agent'); // Get the client's user agent
    const timestamp = new Date().toISOString(); // Timestamp of the email open

    // Prepare data in JSON format
    const logData = {
        timestamp: timestamp,
        ip: ip,
        userAgent: userAgent
    };

    // Log the data to a file (optional)
    const logString = `${timestamp} - IP: ${ip}, User-Agent: ${userAgent}\n`;
    // fs.appendFileSync('email_open_log.txt', logString, 'utf8'); // Write to a log file

    // Respond with the JSON data
    res.json(logData);
});

// Start the server
app.listen(port, () => {
    console.log(`Tracking server running at http://localhost:${port}`);
});
