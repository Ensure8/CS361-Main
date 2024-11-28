# Book-Recommendation-Microservice
Book recommendation microservice for Daniel Guardado's program.

── Communication Contract ──

-How to request
The microservice watches for requests through a 'request.txt' file. To request a book recommendation:
1. Write the desired genre to 'request.txt'
   - Use genre names: "Fiction", "Nonfiction", "Fantasy", or "Science Fiction" (Make sure you spell these right, capitalization doesn't matter)
   - Or write "Any" to get a recommendation from any genre

Example request (python):

def request_book_recommendation(genre):
   with open('request.txt', 'w') as f:
      f.write(genre)
  
#call
request_book_recommendation("Fantasy")



After you write the genre into 'request.txt' to activate the service, it will check what genre you requested by reading the text file. Then it'll pick a random book available in the dictionary I made that has a matching genre key value, and write that book, which is stored in the dictionary in JSON format already, into 'recommended_book.json'. It'll also clear the 'request.txt'. The book information includes: Title, Author, Genre, a link to the book's goodreads page, and a link to the cover image thats shown on the goodreads page.


-How to recieve
The microservice responds by writing the book recommendation to 'recommended_book.json'. To receive the recommendation:
1. Read and parse the 'recommended_book.json' file
2. The response will contain book details in JSON format. You can pull out what you need.

Example receiving code (python):

import json
  
def get_book_recommendation():
   with open('recommended_book.json', 'r') as f:
      return json.load(f)
  
  #call
  book = get_book_recommendation()
  print(f"Title: {book['title']}")
  print(f"Author: {book['author']}")
  print(f"Genre: {book['genre']}")
  print(f"Goodreads Link: {book['goodreads_link']}")
  print(f"Cover Image: {book['cover_image']}")





UML Sequence Diagram

                                   ────────                                    ─────────────
                                  │ Client │                                  │ Microservice|
                                   ───┬────                                    ──────┬──────
                                      │                                              │
                                      │                                              │
        1. Write genre to request.txt │────────────────>│request.txt|<───────────────|2. Loop reading from request.txt until request appears
                                      │                                              │
                                      │                                              │
                                      │                                              │3. Process Request
                                      │                                              │4. Select appropriate book
                                      │                                              │
                                      │                                              │
        6. Read recommended_book.json │──────────>│recommended_book.json|<───────────│5. Write the book's values to recommended_book.json
                                      │                                              │
                                      │                                              │
                                      │                                              │
                                   ───┴────                                    ──────┴──────
                                  │ Client │                                  │ Microservice│
                                   ────────                                    ─────────────


The microservice checks for new requests every 0.1 seconds while it runs to, so waiting a bit after writing your request before attempting to read the response might be required.
