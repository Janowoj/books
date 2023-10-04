import { useEffect, useContext, useCallback } from "react";
// import axios from "axios";
import BookCreate from "./components/BookCreate";
import BookList from "./components/BookList";
import BooksContext from "./context/books";


function App() {

    // const [books, setBooks] = useState([]);

    // const fetchBooks = async () => {
    //     const response = await axios.get('http://localhost:3001/books');

    //     setBooks(response.data);
    // };
    // when should we invoke this function?

    const { fetchBooks } = useContext(BooksContext); // we reach out from the App component this entire object and try to pull out of it fetchBooks function

    useEffect(() => {
        fetchBooks();
    }, []);

    // DON'T DO THIS!!!
    // fetchBooks(); 
    // because it will be invoked EVERY TIME the component is rendered! (infinite loop)

    // DO THIS:
    // useEffect(() => {
    //     console.log("I am inside useEffect!");
    // }, []);

    // const editBookById = async (id, newTitle) => {

    //     const response = await axios.put(`http://localhost:3001/books/${id}`, {
    //         title: newTitle
    //     });


    //     const updatedBooks = books.map((book) => {
    //         if (book.id === id) {
    //             return { ...book, ...response.data }
    //         }
    //         return book;
    //     });

    //     setBooks(updatedBooks);
    // };

    // const deleteBookById = async (id) => {
    //     await axios.delete(`http://localhost:3001/books/${id}`);

    //     const updatedBooks = books.filter((book) => {
    //         return book.id !== id;
    //     });
    //     setBooks(updatedBooks);
    // };

    // const createBook = async (title) => {
    //     const response = await axios.post('http://localhost:3001/books', {
    //         title
    //     });

    //     // console.log(response);

    //     // console.log("I would like to read:", title);
    //     const updatedBooks = [...books,
    //     response.data];
    //     // {
    //     // id: Math.round(Math.random() * 9999), // in some cases it may not be unique, but for small applications it is OK!
    //     // title
    //     // } // title: title



    return (
        <div className="app">
            <h1>Reading List</h1>
            <BookList />
            <BookCreate />
        </div>
    );
}

export default App;

// USING CONTEXT:

// I. Create a context

// 1. Creating a new file. Inside that file we will import createContext from react
// 2. We wil receive a context object.
// 3. This object has 2 properties (react components): Provider and Consumer (not very often used)
// 4. To render the Provider we have to write something like:
// <BooksContext.Provider>

// ==============================================


// II. Specify the data that will be shared

// 'value' is a special prop that we can pass to the Provider:

// Provider, that wraps the BooksContext.Provider component:
// <BooksContext.Provider value={{count, incrementCount}}>
//    <MyComponent />
// </BooksContext.Provider>
// The value can be any data type: string, number, array, object, function, etc.

// e.g.:
// const BooksContext = createContext();

// function Provider({ children }) {
// const [count, setCount] = useState(0);

// const valueToShare = {
//     count: count,
//    incrementCount: () => {
//        setCount(count + 1);
//    }
// };

// return (
// <BooksContext.Provider value={valueToShare}>
//    {children}
// </BooksContext.Provider>
// );
// }

// ==============================================

// III. 'Consume' the context in the components that need the data

// In order to access the data from the context we have to use the useContext hook:
// import { useContext } from 'react';
// import BooksContext from './book';

// function MyComponent() {
//     const books = useContext(BooksContext);

//     return <div>{something}</div>

// ==============================================

// APPLICATION STATE: used by multiple components
// COMPONENT STATE: used by a few components (e.g. BookEdit)

// ==============================================

// Now we want to move our state from App.js to the books context Provider:

// In BookList and BookCreate components we are no longer going to receive props in the App.js component, but we will use the useContext hook to access the data from the context:

// HOOKS:

// Funcions that add additional features to a component.

// useState: allows us to use component state in a functional component.
// useEffect: allows a component to run code at specific points in time (allows us to use lifecycle methods in a functional component).
// useContext: allows a component to access values stored in context.

// CUSTOM HOOKS: functions that we write to make reusable bits of logic.
//  Usually reuse basic hooks like useState, useEffect, useContext.
// Can do a lot or a little.

// In this app we will create a custom hook to make an existing hools more convenient to use.
