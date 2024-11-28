async function getRandomBookAndDisplay() {
try{
    
  




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
catch(e) {
    console.log("Could not retrieve random book.");
}

}