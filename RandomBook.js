const express = require('express');
const cors = require('cors');
const app = express();
const fs = require('fs/promises');

app.use(cors());
app.use(express.static('public'));

app.get('/randomBook', async (req, res) => {
    await fs.writeFile("Book-Recommendation-Microservice-1.0/request.txt", "Any");
    const randomBookData = JSON.parse(await fs.readFile('Book-Recommendation-Microservice-1.0/recommended_book.json', "utf8"));

    res.json(randomBookData);
});

app.listen(3003, () => {console.log(`Server running at http://localhost:3003`);});
