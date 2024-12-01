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
        <button onclick='saveBookToCookieWithId(${JSON.stringify(book)})'>Add</button>
      `;
      bookArticle.appendChild(bookFigure);
    });
  } catch (error) {
    console.log(error);
    bookArticle.innerHTML = '<p>Error loading books.</p>';
  }
}

function saveBookToCookieWithId(book){
  const cookies = document.cookie.split('; ').find(row => row.startsWith('savedBooks='));
  const savedBooks = cookies ? JSON.parse(cookies.split('=')[1]) : [];
  const maxId = savedBooks.reduce((max, book) => Math.max(max, book.id), 0);
  let currentBookIdValue = maxId + 1;
  
  const newBook = {
    id: currentBookIdValue, //Added ID
    isbn: book.isbn,
    title: book.title,
    author: book.author, 
    publishDate: book.publishDate,
    cover: book.cover
  }

  if (!savedBooks.some(savedBook => savedBook.id === newBook.id)) {
    savedBooks.push(newBook);
    document.cookie = `savedBooks=${JSON.stringify(savedBooks)}; max-age=31536000`; // 365 days expiration
  }
}
