let bookIdCounter = 0; // Global counter for generating unique IDs

function gatherAndDisplay() {
  const savedBooks = getBooksFromCookie();
  updateIdCounter(savedBooks); // Ensure the counter starts above existing IDs
  savedBooks.forEach(book => displayBook(book)); // Display books directly from cookie
  addBook();
}

// Ensure the ID counter starts above existing IDs
function updateIdCounter(savedBooks) {
  const maxId = savedBooks.reduce((max, book) => Math.max(max, book.id), 0);
  bookIdCounter = maxId + 1;
}

// Save a book object to cookies
function saveBookToCookie(book) {
  let books = getBooksFromCookie();
  if (!books.some(savedBook => savedBook.id === book.id)) {
    books.push(book);
    document.cookie = `savedBooks=${JSON.stringify(books)}; max-age=31536000`; // 365 days expiration
  }
}

// Retrieve books from cookies
function getBooksFromCookie() {
  const cookies = document.cookie.split('; ').find(row => row.startsWith('savedBooks='));
  return cookies ? JSON.parse(cookies.split('=')[1]) : [];
}

// Fetch book data from Open Library API and save to cookies
async function fetchAndSaveBook(isbn) {
  const responseData = await (await fetch(`https://openlibrary.org/api/books?bibkeys=ISBN:${isbn}&jscmd=data&format=json`)).json();
  const bookData = responseData[`ISBN:${isbn}`];

  // Construct the book object with a unique ID
  const book = {
    id: bookIdCounter++, // Assign a unique ID and increment the counter
    isbn: isbn,
    title: bookData?.title || 'N/A',
    author: bookData?.authors?.[0]?.name || 'N/A', // Only the first author
    publishDate: bookData?.publish_date || 'N/A',
    cover: `https://covers.openlibrary.org/b/isbn/${isbn}-M.jpg`
  };

  saveBookToCookie(book); // Save the book object to cookies
  return book;
}

// Display a book on the page
function displayBook(book) {
  const bookFigure = document.createElement('figure');
  bookFigure.setAttribute('data-id', book.id); // Store the book ID as a data attribute
  bookFigure.innerHTML = `
    <figcaption>
      <p>Title: ${book.title}</p>
      <p>Author: ${book.author}</p>
      <p>Publish Date: ${book.publishDate}</p>
      <button onclick="deleteBook(${book.id})">Delete Book</button>
      <p id="deleteWarning">Note: Pressing this button will remove the book from the catalog.</p>
    </figcaption>      
    <img id="bookImage" src="${book.cover}" alt="Book Cover">      
  `;
  gallery.appendChild(bookFigure);
}

// Delete a book from the catalog
function deleteBook(bookId) {
  if (confirm("This will delete the book")) {
    let books = getBooksFromCookie();
    books = books.filter(book => book.id !== bookId); // Remove the book by ID
    document.cookie = `savedBooks=${JSON.stringify(books)}; max-age=31536000`; // Update cookie

    const bookFigure = document.querySelector(`figure[data-id='${bookId}']`);
    if (bookFigure) bookFigure.remove(); // Remove the figure element from the gallery
  }
}

function addBook() {
  const bookbar = document.getElementById('bookbar');
  document.getElementById('addButton').addEventListener('click', async () => {
    const isbns = bookbar.value.split(',').map(isbn => isbn.trim()); // Get array of ISBNs
    for (const isbn of isbns) {
      const savedBooks = getBooksFromCookie();
      const existingBook = savedBooks.find(book => book.isbn === isbn);

      // Fetch and save book only if it's not already saved
      if (!existingBook) {
        const book = await fetchAndSaveBook(isbn);
        displayBook(book);
      } else {
        displayBook(existingBook); // Display directly from cookies
      }
    }
    bookbar.value = ''; // Clear the input field
  });
}