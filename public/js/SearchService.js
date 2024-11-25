async function searchBooks() {
  const bookArticle = document.getElementById('bookArticle');
  const query = document.getElementById('query').value.trim();

  if (!query) {return};

  try {
    const response = await fetch(`/search?q=${encodeURIComponent(query)}`);
    const books = await response.json();
    
    if (books.length === 0) {bookArticle.innerHTML = '<p>No books found.</p>';return;}

    bookArticle.innerHTML = '';
    books.forEach(book => {
      bookFigure = document.createElement("figure");

      bookFigure.innerHTML = `
        <figcaption>
          <p>Title: ${book.title}</p>
          <p>Author: ${book.authors}</p>
          <p>ISBN: ${book.isbn}</p>
          <p>Published: ${book.publish_date}</p>
        </figcaption>
        <button onclick="saveBookToCookie('${book.isbn}')">Add</button>
      `;

      bookArticle.appendChild(bookFigure);

    });
  } catch (error) {
    bookArticle.innerHTML = '<p>Error loading books.</p>';
  }
}