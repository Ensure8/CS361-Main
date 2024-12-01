const express = require('express');
const cors = require('cors');
const axios = require('axios');
const app = express();

app.use(cors());
app.use(express.static('public'));

app.get('/search', async (req, res) => {
  try {
    const query = req.query.q.replace(/\s+/g, '+');
    const response = await axios.get(`https://openlibrary.org/search.json?q=${query}&fields=isbn,title,author_name,publish_date&offset=0&limit=30`);
    const books = response.data.docs || [];
    const bookList = [];

    for (const book of books) {
      const isbn = book.isbn?.[0] || 'N/A';
      const title = book.title || 'N/A';
      const author = book.author_name?.[0] || 'N/A';
      const publishDate = book.publish_date?.[0] || 'N/A';
      const cover = isbn !== 'N/A' ? `https://covers.openlibrary.org/b/isbn/${isbn}-M.jpg` : 'N/A';

      bookList.push({isbn, title, author, publishDate, cover});
    }

    res.json(bookList);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching books.' });
  }
});

app.listen(3001, () => {
  console.log(`Server running at http://localhost:3001`);
});