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

1. Program used to make requests to an API server, specifically for development and testing purposes.
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

-------------

React is concerned with showing content on the screen.
To make the network request we are going to use a separate (third party )library called Axios:

npm install axios

Now in App.js we are going to do 2 things:

1. Make a request to JSON Server to get the list of books.
2. Take the list of books and update the state.

WE don't need to use Math.random() anymore, because we are going to get the ID from the API server.

Now we need to import Axios into App.js and make a request to the API server.

 const createBook = async (title) => {
        const response = await axios.post('http://localhost:3001/books', {
            title
        });
 }

 console.log(response);

 now in the browser in the Network tab we select Fetch/XHR.

 Then when we create a new book, we can see the request that was made to the API server and the status code that we got back in the Headers tab.

 In the console in the data property we can see the book that was created.

 To check if the book was create we can go to the db.json file and see the book there.

 Now we don't need console.log(response) anymore in the createBook function and don't need either to create book object manually, so we delete them:

const createBook = async (title) => {
        const response = await axios.post('http://localhost:3001/books', {
            title
        });
        console.log(response);
        const updatedBooks = [...books, {
            // id: Math.round(Math.random() * 9999), // in some cases it may not be unique, but for small applications it is OK!
            // title} // title: title
        ];
        setBooks(updatedBooks)
        };

Now the function createBook looks like this:

const createBook = async (title) => {
        const response = await axios.post('http://localhost:3001/books', {
            title
        });
        const updatedBooks = [...books, 
            response.data
        ];
        setBooks(updatedBooks)
        };


Now we can type some book and check if it is seen on the screen and in the db.json file.

After refreshing the page we still don't have a persistent list of books.

<!-- testing useEffect: -->

https://codepen.io/sgrider/pen/BarEowz?editors=1011

const { useState, useEffect } = React;

function App() {
  console.clear();
  const [counterOne, setCounterOne] = useState(0);
  const [counterTwo, setCounterTwo] = useState(0);

//   testing 3 types of useEffect:
  useEffect(() => {
    console.log('Only once')
  }, []);
  
    useEffect(() => {
    console.log('Every time the state is rerendered')
  });
  
  useEffect(() => {
    console.log('Every time couterOne state is rerendered')
  }, [counterOne]);
  
  useEffect(() => {
    console.log('Every time couterTwo state is rerendered')
  }, [counterTwo]);
  
  useEffect(() => {
    console.log('Every time both counters State is rerendered')
  }, [counterOne, counterTwo]);
  
  return (
    <div className="app">
      <div>
        <button onClick={() => setCounterOne(counterOne + 1)}>++ Counter One</button>               
        <div>
          Counter One Value:
        </div>
        <h3>{counterOne}</h3>
      </div>
      <span className="divide" />
      <div>
        <button onClick={() => setCounterTwo(counterTwo + 1)}>++ Counter Two</button>
        <div>
          Counter Two Value:
        </div>
        <h3>{counterTwo}</h3>
      </div>
    </div>
  );
}

const el = document.querySelector('#root');
const root = ReactDOM.createRoot(el);

root.render(<App />);

// BAD SOLUTION to update the state of books:

// const createBook = (title) => {
//     books.push({ id: 123, title: title });
//     setBooks(books);
// }

// initially books.length is equal 0, but after adding some title nothing changes!

// Before rerendering our application, React is going to look at its reference to the cuurent state of books and compare it to the new state of books.
// If the reference is the same, React will not rerender the application.
// This is why we need to create a new array of books and set that as the new state of books.

// GOOD SOLUTION TO UPDATE AN ARRAY OR OBJECT (managed by our state system):

//  const createBook = (title) => {
//      const newBooks = [...books, { id: 123, title: title }];
//      setBooks(newBooks);
//  }

//  so...

//  1. Create a new array
//  2. Copy all of the elements from the old array into the new array
//  3. Add the new element to the new array

//  If there is an array or object, you have to be very careful about how you update this piece of state!

// ============================================================================================================ //

// ADDING elements to the START of an array:

//  const [colors, setColors] = useState([]);

// const addColor = (newColor) => {
//    const updatedColors = [newColor, ...colors];
//    setColors(updatedColors);
// }

// ============================================================================================================ //

// ADDING elements to the END of an array:

//  const [colors, setColors] = useState([]);

// const addColor = (newColor) => {
//    const updatedColors = [...colors, newColor];
//    setColors(updatedColors);
// }

// ============================================================================================================ //

// ADDING elements to the MIDDLE of an array:

//  const [colors, setColors] = useState([]);

// const addColor = (newColor, index) => {
//    const updatedColors = [
//          ...colors.slice(0, index),
//          newColor,
//          ...colors.slice(index)];
//    setColors(updatedColors);
// }

// ============================================================================================================ //

// REMOVING an element with a particular value from an array:

//  const [colors, setColors] = useState(['red', 'green', 'blue']);

// const removeColor = (colorToRemove) => {
//      const updatedColors = colors.filter((color) => {
//          return color !== colorToRemove 
//      });
// setColors(updatedColors);
// };

// ============================================================================================================ //

// REMOVING an element at a particular index from an array:

//  const [colors, setColors] = useState(['red', 'green', 'blue']);

// const removeColorAtIndex = (indexToRemove) => {
//      const updatedColors = colors.filter((color, index) => {
//          return indexToRemove !== index;
//      });
// setColors(updatedColors);
// };

// ============================================================================================================ // 

// REMOVING an element at a particular property from an array:

//  const [colors, setColors] = useState([
//      { id: 1, name: 'Quo Vadis' },
//      { id: 2, name: 'Pan Tadeusz' }
//  ]);

// const removeColorAtIndex = (idToRemove) => {
//      const updatedColors = colors.filter((book) => {
//          return idToRemove !== book.id;
//      });
// setColors(updatedColors);
// };

// FKT means Filter Keeps True (easier to remember);

// ============================================================================================================ // 

// MODIFYING an element based on a property:

//  const [books, setBooks] = useState([
//      { id: 1, title: 'Quo Vadis' },
//      { id: 2, title: 'Pan Tadeusz' }
//  ]);

// const updateBookById = (id, newTitle) => {
//      const updatedBooks = books.map((book) => {
//          if (book.id === id) {
//              return { ...book, title: newTitle };
//          } 

//          return book;
//      });

// setBooks(updatedBooks);
// };

// In this case the title in the book object is going to be ovewritten by the newTitle!

// ============================================================================================================ //

// ADDING AND CHANGING PROPERTIES in an OBJECT:

// const [book, setBook] = useState({
//     id: 1,
//     title: 'Quo Vadis'
// });

// const updateBook = () => {
    // const updatedBook = {           // create a new object
        // ...book,                    // copy all of the properties from the book object
        // title: 'Pan Tadeusz'        // add in your updated property (the old one will be overwritten)
    // };    

// setBook(updatedBook);
// };

// ============================================================================================================ //

// REMOVING a property from an OBJECT:

// const [book, setBook] = useState({
//     id: 1,
//     title: "Hobbit",
//     author: "J.R.R.Tolkien"
// });

// const removedId = () => {
//     const {id, ...rest} = book; // after ... use the name as you want

//     setBook(rest);
// }

// ============================================================================================================ //

// Props:
// book - an object with id and title properties
// onSubmit - a function that will be called when the user submits the form


// ============================================================================================================ //

//  useEffect

//  1. This is a function that we import from React
//  2. Used to run code when the component is INICIALLY rendered and sometimes when it is re-rendered
//  3. First argument is a function that contains the code that you want to run
//  4. Second argument is an array of dependencies or nothing - this controls whether or not the function is executed on re-renders.

// Three tricky points about useEffect:

// I. Understanding WHEN our arrow function is invoked
// II. Understanding the arrow function's RETURN VALUE
// III. Understanding state variable references

// I. Understanding WHEN our arrow function is invoked

// 1. Component called
// 2. JSX is returned
// 3. DOM is updated

// Initial render is ended!
// State is updated! (user made some changes)

// 1. Component called
// 2. JSX is returned
// 3. DOM is updated

// Second render is ended!
// State is updated!

// ... and so on
// ... so when is our arrow function invoked?
// it is automatically invoked immediately after the initial render 
// and (maybe) after every re-render (second argument controls this).

// EXAMPLES:

    // useEffect(() => {
    //     console.log("I am inside useEffect!");
    // }, []);

// called after inicial render
// never called again

  // useEffect(() => {
    //     console.log("I am inside useEffect!");
    // });

// called after inicial render
// also called after every re-render

    // useEffect(() => {
    //     console.log("I am inside useEffect!");
    // }, [counter]);

// called after inicial render
// also called after every re-render if counter has changed (very rare)

// To avoid mistakes with out of date state, we shoud take the response 
// and use that to update our state instead of using the state directly (manually).


    
