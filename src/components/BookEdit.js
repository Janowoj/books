import { useState } from "react";

function BookEdit({ book, onSubmit }) {

    const [title, setTitle] = useState(book.title);

    const handleChange = (event) => {
        setTitle(event.target.value);
    }

    const handleSubmit = (event) => {
        event.preventDefault();

        // console.log('New title:', title) // now we have onEdit
        // onEdit(book.id, title);
        // onSubmit(); // this makes the form disappear (showEdit = false)
        onSubmit(book.id, title);
    }

    return <form className="book-edit" onSubmit={handleSubmit}>
        <label>Title</label>
        <input className="input" value={title} onChange={handleChange} />
        <button className="button is-primary" >Save</button> // user has to know, that the book title was succesfully edited
    </form>
}

export default BookEdit;

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

 

