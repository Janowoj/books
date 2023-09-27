// import { useContext } from 'react';
// import BooksContext from '../context/books';
import BookShow from './BookShow';
import useBooksContext from '../hooks/use-books-context';

function BookList() {
    const { books } = useBooksContext();

    const renderedBooks = books.map((book) => {
        return <BookShow key={book.id} book={book} />;
    });

    return <div className="book-list">{renderedBooks}</div>;
}

export default BookList;

// we want to refactor BookList.js to use the BooksContext instead of props (books, onDelete, onEdit).
// we will use the useContext hook to access the value from the BooksContext.

// 1. We will tell BookList not going to receive onEdit and onDelete as props anymore.
// 2. We are going to make sure it doesn't pass onEdit and onDelete as props to BookShow.
// 3. Tell Booklist not to receive books as props anymore.
// 4. If BookList wants to get the list of books, it will use the useContext hook to access the value from the BooksContext.

// Because we make use of context and props together on a single project, so we need book prop to be passed down to BookShow component.