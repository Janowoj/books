On this react project user adds books (which one wants to read) to the list. These listed cards can be deleted or edited.

UPDATING THE STATE:

If we want to updeate some state in component, we should rerender this component and all that component's children.

How?

Find all the components that need to use this state.
Define the state in the lowest common parent.

In case of BOOKS piece of state the lowest common parent component is App.

EVENT HANDLERS:

createBook
editBook
deleteBook

https://picsum.photos

Just add your desired image size (width & height) after our URL, and you'll get a random image.

https://picsum.photos/200/300
To get a square image, just add the size.

https://picsum.photos/200

<!--  -->

Database and API Server is going to take charge for keeping track of all of our books that get created over time. 
When the user comes back at some point in the future, he is going to see all of the books that they had created.

JSON Server is an open source project intended for creating an API server for development and learning.

JSON Server (API server) is really close to a production API.

We will use three functions:
editBookById
deleteBookById
createBook

to make a request off to our API server.

E.g. once our function gets the response that the book was successfully deleted, 
delete book by ID is then going to go to our books piece of state and remove the book with the ID that we just got back from the API server.

Things we need to do:

I. Create the API and understand how it works.

1. Install JSON Server with npm install json-server (on separate terminal window)
2. Create a db.json file with some data (this is where the data will be stored)
3. Create a command to run the server in package.json: ("server" : "json-server --port 3001 --watch db.json --host 127.0.0.1")
4. Run the command (npm run server)! Now we have a server running on localhost:3001

II. When app starts up, make a request to the API to get the current list of all books (4 routes in total: GET, POST, PUT, DELETE, though there are other routes that we can use as well)
III. When the user creates/deletes/edits a book, update the API, then update local data (state).

Standalone API client:

1. Program used to make requests to an API server, specifically fir development and testing purposes.
2. There are many free API clients
3. I am going to use one built into VS Code

<!--  -->
REST Client installed in VS Code (as an extension).
api.http file created.

# Get old books
GET http://localhost:3001/books HTTP/1.1
Content-Type: application/json

Many headers received in response, but down to the bottom we can see the data (an array) that we are looking for.

# Create a book
POST http://localhost:3001/books HTTP/1.1
Content-Type: application/json

Many headers received in response, but down to the bottom we can see the data (an object) that we are looking for.

# Update a book
PUT http://localhost:3001/books/1 HTTP/1.1
Content-Type: application/json

A single book has a new title.

# Delete a book
DELETE http://localhost:3001/books/1 HTTP/1.1
Content-Type: application/json

We get back an empty object.



