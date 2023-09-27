import { useState } from "react";
import useBooksContext from '../hooks/use-books-context';

function BookEdit({ book, onSubmit }) {

    const [title, setTitle] = useState(book.title);
    const { editBookById } = useBooksContext();

    const handleChange = (event) => {
        setTitle(event.target.value);
    }

    const handleSubmit = (event) => {
        event.preventDefault();

        // console.log('New title:', title) // now we have onEdit
        // onEdit(book.id, title);
        // onSubmit(); // this makes the form disappear (showEdit = false)
        onSubmit();
        editBookById(book.id, title);
    }

    return (
        <form className="book-edit" onSubmit={handleSubmit}>
            <label>Title</label>
            <input className="input" value={title} onChange={handleChange} />
            <button className="button is-primary" >Save</button>
        </form>
    );
}

export default BookEdit;
// user has to know, that the book title was succesfully edited

// whenever user submits a form after making a change,
//  the visibility of edit component should be toggled!
//  We have to make some improvement into onEdit prop.

// Two things need to happed, when the form is submitted:
// 1. Need to tell the App that there is a new title for particular book;
// 2. Need to tell the BookShow component to close the edit form.

// We can solve this problem in two ways:
//  1. Not really good:
//  On the BookShow component, we can pass a function handleSubmit,
//  which will set the showEdit state to false.
//  Then we will pass that function to the BookEdit component as a prop (onSubmit).
// but..
// We have two functions, whenever the user submits a form!

//  2. Better.

//  Create one function handleSubmit on the BookEShow component, combining two callbacks

// onEdit prop removed.

// ==============================================

// Whenever we call editBookById, we are going to make a request to the server
// and update some books with some particular id.
// E.g. the book of id 1 should now have a title of "The Great Gatsby".

// The API server is going to send the response back with the updated book.

//  After that, we are going to update the state of books with the updated book.

// REFACTORING with CONTEXT:

// 1. When we call onSubmit we don't have to pass the id of the book and the title.
//  2. We are calling editBookById with the id of the book and the title.
// editBookById(book.id, title);