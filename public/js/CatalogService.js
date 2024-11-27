function gatherAndDisplay(){  
  getBooksFromCookie().forEach(isbn => fetchAndDisplayBook(isbn));
  addBook();  
}

// Get array of ISBNs from cookie, check for duplicates, push new ISBN values with a max-age attribute value of 365 days.
function saveBookToCookie(isbn) {
  let books = getBooksFromCookie();
  if (!books.includes(isbn)) {
    books.push(isbn);
    document.cookie = `savedBooks=${JSON.stringify(books)}; max-age=31536000`;
  }
}

// Retrieve books from cookies
function getBooksFromCookie() {
  const cookies = document.cookie.split('; ').find(row => row.startsWith('savedBooks='));
  if (cookies) {
    return JSON.parse(cookies.split('=')[1]);
  } 
  else {
    return [];
  }
}

// Fetch and display book data
async function fetchAndDisplayBook(isbn) {
    const bookDataResponse = await fetch(`https://openlibrary.org/search.json?q=isbn:${isbn}`).then(response => response.json());      
    const bookFigure = document.createElement('figure');
    bookFigure.innerHTML = 
    `
      <figcaption>
        <p>Title: ${bookDataResponse.docs[0].title || 'N/A'}</p>
        <p>Author: ${bookDataResponse.docs[0].author_name[0] || 'N/A'}</p>
        <p>Publish Date: ${bookDataResponse.docs[0].publish_date[0] || 'N/A'}</p>
        <button onclick="deleteBook('${isbn}', this)">Delete Book</button>
        <p id="deleteWarning">Note: Pressing this button will remove the book from the catalog.</p>
      </figcaption>      
      <img id="bookImage" src="https://covers.openlibrary.org/b/isbn/${isbn}-M.jpg" alt="Book Cover">      
    `;
    gallery.appendChild(bookFigure);    
}

function deleteBook(isbn, buttonElement) {
  if (confirm("This will delete the book")) {
    let books = getBooksFromCookie();
    books = books.filter(savedIsbn => savedIsbn !== isbn); //Remove the ISBN from saved books.
    document.cookie = `savedBooks=${JSON.stringify(books)}; max-age=31536000`; //Update cookie with new JSON books array and new max-age attribute

    buttonElement.closest('figure').remove(); // Remove the figure element from the gallery.
  }
}

function showDescriptiveText() {
  document.getElementById('guideParagraph').innerHTML = "By giving an ISBN value to the bar and clicking on the 'Add' button you will be able to add the book to your catalog. You will then see important book information related to the title, author, and publication date. You can also add multiple books by giving a series of ISBN numbers separated by commas. Please note that if no books are added, it's possible the Open Library API services may not be working correctly."; 
}

function addBook(){
  const bookbar = document.getElementById('bookbar');

  document.getElementById('addButton').addEventListener('click', () => {
    const isbns = bookbar.value.split(',').map(isbn => isbn.trim()); // Get array of ISBNs
    isbns.forEach(isbn => {
      fetchAndDisplayBook(isbn);
      saveBookToCookie(isbn);
    });
    bookbar.value = ''; // Clear the input field
  });
}

