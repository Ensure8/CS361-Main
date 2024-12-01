async function getRandomBookAndDisplay() {
try{
    let currentBookIdValue = getBookIdCounterValue + 1;
    const randomBookResponseData = await (await fetch("http://localhost:3004/randomBook")).json();
  
    const book = {
        id: currentBookIdValue,
        isbn: 'N/A',
        title: randomBookResponseData?.title || 'N/A',
        author: randomBookResponseData?.author?.[0]?.name || 'N/A', 
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

function getBookIdCounterValue () {
  const cookies = document.cookie.split('; ').find(row => row.startsWith('savedBooks='));
  const savedBooks = cookies ? JSON.parse(cookies.split('=')[1]) : [];
  const maxId = savedBooks.reduce((max, book) => Math.max(max, book.id), 0);
  
  return maxId;
}