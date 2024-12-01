import json
import random
import time


#Books with genres. in JSON format
BOOKS = [
    #Fiction
    {
        "title": "The Great Gatsby",
        "author": "F. Scott Fitzgerald",
        "genre": "Fiction",
        "goodreads_link": "https://www.goodreads.com/book/show/4671.The_Great_Gatsby",
        "cover_image": "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1490528560i/4671.jpg"
    },
    {
        "title": "Crime and Punishment",
        "author": "Fyodor Dostoevsky",
        "genre": "Fiction",
        "goodreads_link": "https://www.goodreads.com/book/show/7144.Crime_and_Punishment",
        "cover_image": "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1382846449i/7144.jpg"
    },
    
    #Nonfiction
    {
        "title": "Atomic Habits",
        "author": "James Clear",
        "genre": "Nonfiction",
        "goodreads_link": "https://www.goodreads.com/book/show/40121378-atomic-habits",
        "cover_image": "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1655988385i/40121378.jpg"
    },
    {
        "title": "Into the Wild",
        "author": "Jon Krakauer",
        "genre": "Nonfiction",
        "goodreads_link": "https://www.goodreads.com/book/show/60869516-into-the-wild",
        "cover_image": "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1650755924i/60869516.jpg"
    },

    #Fantasy
    {
        "title": "The Hobbit",
        "author": "J.R.R. Tolkien",
        "genre": "Fantasy",
        "goodreads_link": "https://www.goodreads.com/book/show/5907.The_Hobbit",
        "cover_image": "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1546071216i/5907.jpg"
    },
    {
        "title": "The Name of the Wind",
        "author": "Patrick Rothfuss",
        "genre": "Fantasy",
        "goodreads_link": "https://www.goodreads.com/book/show/186074.The_Name_of_the_Wind",
        "cover_image": "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1270352123i/186074.jpg"
    },

    #Science Fiction
    {
        "title": "Project Hail Mary",
        "author": "Andy Weir",
        "genre": "Science Fiction",
        "goodreads_link": "https://www.goodreads.com/book/show/54493401-project-hail-mary",
        "cover_image": "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1597695864i/54493401.jpg"
    },
    {
        "title": "Dune",
        "author": "Frank Herbert",
        "genre": "Science Fiction",
        "goodreads_link": "https://www.goodreads.com/book/show/44767458-dune",
        "cover_image": "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1555447414i/44767458.jpg"
    }
]

def get_book_recommendation(genre=None):
    #get a random book recommendation, optionally filtered by genre
    if genre:
        #filter books by genre
        genre_books = [book for book in BOOKS if book['genre'].lower() == genre.lower()]
        selected_book = random.choice(genre_books)
    else:
        selected_book = random.choice(BOOKS)
    #write the selected book to the JSON file
    with open('recommended_book.json', 'w') as f:
        json.dump(selected_book, f, indent=2)
    
    return selected_book


if __name__ == "__main__":
    while True:
        
        #read the request file
        with open('request.txt', 'r') as f:
            request = f.read().strip()  
        #only process if there's a request
        if request:
            #set genre based on request
            genre = None if request.lower() == "any" else request 
            #get the recommendation
            get_book_recommendation(genre) 
            #clear the request file
            with open('request.txt', 'w') as f:
                f.write('')
            
        time.sleep(0.1)