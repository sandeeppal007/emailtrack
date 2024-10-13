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
    
    // Log the data to a file
    const logData = `${timestamp} - IP: ${ip}, User-Agent: ${userAgent}\n`;
    fs.appendFile('email_tracking.log', logData, (err) => {
        if (err) console.error('Error logging email open:', err);
    });

    // Send the tracking pixel (1x1 transparent gif)
    res.sendFile(path.join(__dirname, 'tracking-pixel.gif'));
});

// Start the server
app.listen(port, () => {
    console.log(`Tracking server running at http://localhost:${port}`);
});
