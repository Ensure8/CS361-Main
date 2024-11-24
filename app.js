const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.static('public'));

app.get('/search', async (req, res) => {
    const query = req.query.q.replace(/\s/g, '+');
    const response = await axios.get(`https://openlibrary.org/search.json?q=${query}`);
    const books = response.data.docs;
    res.json(books);
  });

app.listen(PORT);