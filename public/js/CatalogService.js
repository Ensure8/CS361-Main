let bookIdCounter = 0; // Counter for unique IDs

function gatherAndDisplay() {
  const savedBooks = getBooksFromCookie();
  updateIdCounter(savedBooks);
  savedBooks.forEach(book => displayBook(book));
  addBook();
}

// Makes sure the ID counter starts above existing IDs (only goes forward/higher).
function updateIdCounter(savedBooks) {
  const maxId = savedBooks.reduce((max, book) => Math.max(max, book.id), 0);
  bookIdCounter = maxId + 1;
}

// Save a js book object to cookie
function saveBookToCookie(book) {
  let books = getBooksFromCookie();
  if (!books.some(savedBook => savedBook.id === book.id)) {
    books.push(book);
    document.cookie = `savedBooks=${JSON.stringify(books)}; max-age=31536000`; // 365 days expiration
  }
}

// Retrieve books from cookie (or an empty array if at least one book object isn't there).
function getBooksFromCookie() {
  const cookies = document.cookie.split('; ').find(row => row.startsWith('savedBooks='));
  return cookies ? JSON.parse(cookies.split('=')[1]) : [];
}

// Fetch book data from Open Library legacy book API and save information to cookie.
async function fetchAndSaveBook(isbn) {
  const responseData = await (await fetch(`https://openlibrary.org/api/books?bibkeys=ISBN:${isbn}&jscmd=data&format=json`)).json();
  if (JSON.stringify(responseData) === '{}') {return {};}//Check if there's any data, otherwise return and dont add book to catalog.
  const bookData = responseData[`ISBN:${isbn}`];

  // Create book object with unique ID.
  const book = {
    id: bookIdCounter++, 
    isbn: isbn,
    title: bookData?.title || 'N/A',
    author: bookData?.authors?.[0]?.name || 'N/A',
    publishDate: bookData?.publish_date || 'N/A',
    cover: `https://covers.openlibrary.org/b/isbn/${isbn}-M.jpg`
  };

  saveBookToCookie(book); // Save the book object to 'savedBooks' cookie
  return book;
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
        if (JSON.stringify(book) === '{}') {continue;}
        displayBook(book);
      }
    }
    bookbar.value = ''; 
  });
}

// Display books on the page by creating new figure elements with id attributes.
function displayBook(book) {
  const bookFigure = document.createElement('figure');
  bookFigure.setAttribute('bookID', book.id);
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

// Delete a book from the catalog. First the cookie data then the figure (dynamically).
function deleteBook(bookId) {
  if (confirm("This will delete the book")) {
    let books = getBooksFromCookie();
    books = books.filter(book => book.id !== bookId); // Remove the book by ID
    document.cookie = `savedBooks=${JSON.stringify(books)}; max-age=31536000`; // Update cookie

    const bookFigure = document.querySelector(`figure[bookID='${bookId}']`);
    if (bookFigure) bookFigure.remove(); // Remove the figure element from the gallery
  }
}


function showDescriptiveText(){
  const infoButton = document.getElementById("infoButton");
  if (infoButton.getAttribute("clicked-on") === "false") {
    document.getElementById("guideParagraph").innerHTML = `To use the catalog service, you must give an ISBN or a list of ISBNs separated by commas to add specific books to your library catalog. Once the books show up, a delete button will also present itself in order for you to delete the particular book from your catalog. You may also add a random book if you don't feel like adding one manually through an ISBN. If by any chance, a book isn't being added or it takes a long time, it could be due to problems with OpenLibrary's APIs.`;
    infoButton.setAttribute("clicked-on", "true");
  }
  else {
    document.getElementById("guideParagraph").innerHTML = `To use this service, enter a book ISBN and click "Add" to add it to your gallery catalog.`;
    infoButton.setAttribute("clicked-on", "false");
  }
}