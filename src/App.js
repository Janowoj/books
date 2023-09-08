import { useState } from "react";
import BookCreate from "./components/BookCreate";



function App() {

    const [book, setBook] = useState([]);

    const createBook = (title) => {
        console.log("I would like to read:", title);
    }

    return <div>
        <BookCreate onCreate={createBook} />
    </div>
}

export default App;