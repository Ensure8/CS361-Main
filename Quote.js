const express = require('express');
const cors = require('cors');
const app = express();
const fs = require('fs/promises');

app.use(cors());
app.use(express.static('public'));

app.get('/quote', async (req, res) => {
    const quotesData = await fs.readFile('private/quotes.json', "utf8");
    const quoteObjects = JSON.parse(quotesData);
    
    res.json(quoteObjects[Math.floor(Math.random() * quoteObjects.length)]);
});

app.listen(3003, () => {console.log(`Server running at http://localhost:3003`);});
