const express = require('express');
const fs = require('fs');
const app = express();
const port = 3000;

app.use(express.static('public'));

app.get('/log', (req, res) => {
    const ip = req.ip;
    const now = new Date();
    const logEntry = `${ip} - ${now.toISOString()}\n`;

    fs.appendFile('views.txt', logEntry, (err) => {
        if (err) {
            console.error('Error writing to file', err);
        }
    });

    res.sendStatus(200);
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
