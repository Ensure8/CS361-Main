async function searchBooks() {
try {
  const bookArticle = document.getElementById('bookArticle');
  const searchBar = (document.getElementById('searchBar').value.trim() === "" ? "harry potter" : document.getElementById('searchBar').value.trim());
  const bookObjects = await (await fetch(`http://localhost:3001/search?q=${encodeURIComponent(searchBar)}`)).json();
  
  if (bookObjects.length === 0) {bookArticle.innerHTML = '<p>No books found.</p>';return;}

  bookArticle.innerHTML = '';
  bookObjects.forEach(book => {
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