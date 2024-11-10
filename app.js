const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.static('public'));
/*
// Login Service (WIP)
app.get('/getCredentials', (req, res) => {
    fs.readFile('credentials.txt', 'utf8', (data) => {
        res.send(data);
    });
});*/

app.listen(PORT);