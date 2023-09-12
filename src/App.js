import { useState } from "react";
import BookCreate from "./components/BookCreate";
import BookList from "./components/BookList";



function App() {

    const [books, setBooks] = useState([]);

    const deleteBookById = (id) => {
        const updatedBooks = books.filter((book) => {
            return id !== book.id;
        });
        setBooks(updatedBooks);
    }

    const createBook = (title) => {
        // console.log("I would like to read:", title);
        const updatedBooks = [...books, {
            id: Math.round(Math.random() * 9999), // in some cases it may not be unique, but for small applications it is OK!
            title} // title: title
        ];
        setBooks(updatedBooks)
        };
    
    return <div className="app">
        {/* {books.length} */}
        <BookList books={books} onDelete={deleteBookById}/>
        <BookCreate onCreate={createBook} />
    </div>
}

export default App;

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

