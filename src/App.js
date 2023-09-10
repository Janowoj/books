import { useState } from "react";
import BookCreate from "./components/BookCreate";



function App() {

    const [books, setBooks] = useState([]);

    const createBook = (title) => {
        // console.log("I would like to read:", title);
        books.push({ id: 123, title: title });
        console.log(books);
        setBooks(books);
    }

    return <div>
        {books.length}
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