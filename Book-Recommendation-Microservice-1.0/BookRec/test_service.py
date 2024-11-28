import json
import time

def write_request(genre): 
    #write a genre request to request.txt 
    with open('request.txt', 'w') as f:
        f.write(genre)

def read_recommendation():
    #read and display the recommended book from the JSON file
     with open('recommended_book.json', 'r') as f:
        book = json.load(f)
        print("\n Received Book Recommendation:")    
        print("=" * 50) #diviser
        print(f"Title: {book['title']}") 
        print(f"Author: {book['author']}")   
        print(f"Genre: {book['genre']}")
        print(f"Goodreads: {book['goodreads_link']}") 
        print(f"Cover: {book['cover_image']}")
        print("=" * 50)
 
def test_recommendation(genre):
    print(f"\ngenre requested: {genre}")
    write_request(genre)
    # Wait for the service to process the request
    time.sleep(0.5)
    read_recommendation() 
 
def run_tests(): 
    #specific genre test
    test_recommendation("Science Fiction")#just for example I am using Science Fiction
    time.sleep(1)
    #any genre test
    test_recommendation("Any")
    print("\n tests completed")

if __name__ == "__main__":
    print("Make sure the book service is running before starting tests") 
    run_tests()