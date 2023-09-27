import { useState } from 'react';
import BookEdit from './BookEdit';
import useBooksContext from '../hooks/use-books-context';

function BookShow({ book }) {

    const [showEdit, setShowEdit] = useState(false); // we don't want to ShowEdit by default
    const { deleteBookById } = useBooksContext();

    const handleDeleteClick = () => {
        deleteBookById(book.id);
    };

    const handleEditClick = () => {
        setShowEdit(!showEdit)
    }

    const handleSubmit = () => {
        setShowEdit(false);
        // onEdit(id, newTitle) // we need to pass the id of the book and the new title to BookShow component
    }

    let content = <h3>{book.title}</h3>;
    if (showEdit) {
        content = <BookEdit onSubmit={handleSubmit} book={book} />;
    }

    return (
        <div className="book-show">
            <img alt='books' src={`https://picsum.photos/seed/${book.id}/300/200`} />
            <div>{content}</div>
            <div className="actions">
                <button className='edit' onClick={handleEditClick}>Edit</button>
                <button className="delete" onClick={handleDeleteClick}>Delete</button>
            </div>
        </div>
    );
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

// REFACTORING with CONTEXT:

// 1. We will tell BookList not going to receive onEdit and onDelete as props anymore.
// 2. We need books prop to be passed down to BookShow component and get the appropriate fuunctions.
// 3. Now BookShow only needs to delete book by ID (onEdit actually calls that function).
// 4. We still need bookShow to understand and know that it needs to hide the bookEdit component.