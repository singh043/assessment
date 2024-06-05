import React, { useState, useEffect } from 'react';

function BookshelfPage() {
  const [bookShelf, setBookShelf] = useState([]);

  useEffect(() => {
    const storedBooks = JSON.parse(localStorage.getItem("bookList")) || [];
    setBookShelf(storedBooks);
  }, []);

  const removeBookFromShelf = (book) => {
    const updatedShelf = bookShelf.filter(b => b.title !== book.title || b.author[0] !== book.author[0] || b.editionCount !== book.editionCount);
    setBookShelf(updatedShelf);
    localStorage.setItem("bookList", JSON.stringify(updatedShelf));
  };

  return (
    <div className="BookshelfPage">
      <h1 className='heading'>My Bookshelf</h1>
      <div className='books'>
        {
          bookShelf && bookShelf.map((book, index) => (
            <div key={index} className='book'>
              <div className='bookStyle'>
                <span className='titles'>Book Title:</span>
                <p className='titleContent'>{book.title}</p>
              </div>
              <div className='bookStyle'>
                <span className='titles'>Author:</span>
                <p className='titleContent'>{book.author}</p>
              </div>
              <div className='bookStyle'>
                <span className='titles'>Edition Count:</span>
                <p className='titleContent'>{book.editionCount}</p>
              </div>
              <button 
                className="removeFromBookshelf" 
                onClick={() => removeBookFromShelf(book)}
              >
                Remove from Bookshelf
              </button>
            </div>
          ))
        }
      </div>
    </div>
  );
}

export default BookshelfPage;
