import { useState } from 'react';
import BookEdit from './BookEdit';

function BookShow({ book, onDelete }) {

    const [showEdit, setShowEdit] = useState(false); // we don't want to ShowEdit by default

    const handleEditClick = () => {
        setShowEdit(!showEdit)
    }

    const handleDeleteClick = () => {
        onDelete(book.id);
    };

    let content = <h3>{book.title}</h3>;
    if (showEdit) {
        content = <BookEdit />;
    }


    return <div className="book-show">
        <div>{content}</div>
        <div className="actions">
            <button className='edit' onClick={handleEditClick}>Edit</button>
            <button className="delete" onClick={handleDeleteClick}>Delete</button>
        </div>
    </div>
}

export default BookShow;

// need to show either:
// the TITLE of the book
// or
// BOOKEDIT.

// Content is changing, when user clicks the pensil icon,
// so we need to use state.