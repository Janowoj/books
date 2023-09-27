import { createContext, useState } from 'react';
import axios from "axios";

const BooksContext = createContext();

function Provider({ children }) {
    // const [count, setCount] = useState(5);

    // const valueToShare = {
    //     count,
    //     incrementCount: () => {
    //         setCount(count + 1);
    //     }
    // }

    const [books, setBooks] = useState([]);

    const fetchBooks = async () => {
        const response = await axios.get('http://localhost:3001/books');

        setBooks(response.data);
    };

    const editBookById = async (id, newTitle) => {

        const response = await axios.put(`http://localhost:3001/books/${id}`, {
            title: newTitle
        });


        const updatedBooks = books.map((book) => {
            if (book.id === id) {
                return { ...book, ...response.data }
            }
            return book;
        });

        setBooks(updatedBooks);
    };

    const deleteBookById = async (id) => {
        await axios.delete(`http://localhost:3001/books/${id}`);

        const updatedBooks = books.filter((book) => {
            return book.id !== id;
        });
        setBooks(updatedBooks);
    };

    const createBook = async (title) => {
        const response = await axios.post('http://localhost:3001/books', {
            title
        });

        // console.log(response);

        // console.log("I would like to read:", title);
        const updatedBooks = [...books,
        response.data];
        // {
        // id: Math.round(Math.random() * 9999), // in some cases it may not be unique, but for small applications it is OK!
        // title
        // } // title: title
        setBooks(updatedBooks)
    };

    const valueToShare = {
        books,
        fetchBooks,
        editBookById,
        deleteBookById,
        createBook  // createBook: createBook etc.
    };

    return (
        <BooksContext.Provider value={{valueToShare
        }}>
            {children}
        </BooksContext.Provider>
    );
}

export { Provider }; // named export
export default BooksContext; // default export