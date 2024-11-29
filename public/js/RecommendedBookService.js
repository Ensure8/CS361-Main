async function getRandomBookAndDisplay() {
try{
    const cookies = document.cookie.split('; ').find(row => row.startsWith('savedBooks='));
    const savedBooks = cookies ? JSON.parse(cookies.split('=')[1]) : [];
    const maxId = savedBooks.reduce((max, book) => Math.max(max, book.id), 0);
    let bookIdCounter = maxId + 1;

    const randomBookResponseData = await (await fetch("http://localhost:3003/randomBook")).json();
  
    const book = {
        id: bookIdCounter,
        isbn: 'N/A',
        title: randomBookResponseData?.title || 'N/A',
        author: randomBookResponseData?.author?.[0]?.name || 'N/A', // Only the first author
        publishDate: 'N/A',
        cover: randomBookResponseData?.cover_image || 'N/A'
      };

      if (!savedBooks.some(savedBook => savedBook.id === book.id)) {
        savedBooks.push(book);
        document.cookie = `savedBooks=${JSON.stringify(savedBooks)}; max-age=31536000`; // 365 days expiration
      }
      location.reload();
}
catch(e) {
    console.log("Could not retrieve random book.");
}

}