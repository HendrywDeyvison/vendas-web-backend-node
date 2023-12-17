const express = require('express');

const app = express();

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.get('/user', (req, res) => {
    res.send({
        "user": "Root"
    });
});

app.listen(8080, () => {
    console.log('Server app running on port 8080!');
});