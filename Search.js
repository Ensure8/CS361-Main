const express = require('express');
const cors = require('cors');
const axios = require('axios');
const app = express();

app.use(cors());
app.use(express.static('public'));

app.get('/search', async (req, res) => {
try {
  const query = req.query.q.replace(/\s+/g, '+'); // Replace spaces with plus signs for URL encoding    
  const response = await axios.get(`https://openlibrary.org/search.json?q=${query}&fields=isbn,title,author_name,publish_date&offset=0&limit=20`);
  const books = response.data.docs;
  const bookDetails = [];

  for (const book of books) {
    const bookData = {
      title: book.title || 'No Title',
      authors: book.author_name ? book.author_name.slice(0, 1).join(', ') : 'Unknown Author',
      isbn: book.isbn ? book.isbn[0] : 'No ISBN',
      publish_date: book.publish_date ? book.publish_date[0] : 'No Publish Date',
    };
    bookDetails.push(bookData);
  }

  res.json(bookDetails);
} catch (error) {
  res.status(500).json({error: 'Error fetching books.'});
}
});

app.listen(3001, () => {console.log(`Server running at http://localhost:3001`);});
