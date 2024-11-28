async function searchBooks() {
  try {
    const bookArticle = document.getElementById('bookArticle');
    const searchBarValue = document.getElementById('searchBar').value.trim() || "harry potter";
    const bookList = await (await fetch(`http://localhost:3001/search?q=${encodeURIComponent(searchBarValue)}`)).json();

    bookArticle.innerHTML = ''; // Clear previous search results

    if (bookList.length === 0) {bookArticle.innerHTML = '<p>No books found.</p>';return;}

    bookList.forEach(book => {
      const bookFigure = document.createElement("figure");

      bookFigure.innerHTML = `
        <figcaption>
          <p>Title: ${book.title}</p>
          <p>Author: ${book.author}</p>
          <p>ISBN: ${book.isbn}</p>
          <p>Published: ${book.publishDate}</p>
        </figcaption>
        <button onclick='saveBookToCookie(${JSON.stringify(book)})'>Add</button>
      `;
      bookArticle.appendChild(bookFigure);
    });
  } catch (error) {
    console.log(error);
    bookArticle.innerHTML = '<p>Error loading books.</p>';
  }
}

