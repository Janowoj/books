import { useState } from 'react';
import BookEdit from './BookEdit';

function BookShow({ book, onDelete, onEdit }) {

    const [showEdit, setShowEdit] = useState(false); // we don't want to ShowEdit by default

    const handleEditClick = () => {
        setShowEdit(!showEdit)
    }

    const handleDeleteClick = () => {
        onDelete(book.id);
    };

    const handleSubmit = (id, newTitle) => {
        setShowEdit(false);
        onEdit(id, newTitle) // we need to pass the id of the book and the new title to BookShow component
    }

    let content = <h3>{book.title}</h3>;
    if (showEdit) {
        content = <BookEdit onSubmit={handleSubmit} book={book} />;
    }

    return <div className="book-show">
        <img alt='books' src={`https://picsum.photos/seed/${book.id}/300/200`} />
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

// onEdit={onEdit} removed from BookShow component.
// Now we have one single prop whenever user submits a form.