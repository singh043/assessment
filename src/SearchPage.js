import React, { useState, useEffect } from 'react';

function SearchPage() {
  const [booksData, setBooksData] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [bookShelf, setBookShelf] = useState([]);

  useEffect(() => {
    const storedBooks = JSON.parse(localStorage.getItem("bookList")) || [];
    setBookShelf(storedBooks);
  }, []);

  useEffect(() => {
    if (searchInput === "") {
      return;
    }
    const delayDebounceFn = setTimeout(() => {
      fetch(`https://openlibrary.org/search.json?q=${searchInput}&limit=10&page=1`)
        .then((res) => res.json())
        .then((res) => {
          setBooksData(res.docs);
        })
        .catch((err) => console.log(err));
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [searchInput]);

  const addBookToShelf = (book) => {
    const updatedShelf = [...bookShelf, {
      title: book.title,
      author: book.author_name,
      editionCount: book.edition_count,
    }];
    setBookShelf(updatedShelf);
    localStorage.setItem("bookList", JSON.stringify(updatedShelf));
  };

  const removeBookFromShelf = (book) => {
    const updatedShelf = bookShelf.filter(b => b.title !== book.title || b.author[0] !== book.author_name[0] || b.editionCount !== book.edition_count);
    setBookShelf(updatedShelf);
    localStorage.setItem("bookList", JSON.stringify(updatedShelf));
  };

  const isBookInShelf = (book) => {
    return bookShelf.some(b => b.title === book.title && b.author[0] === book.author_name[0] && b.editionCount === book.edition_count);
  };

  return (
    <div className="SearchPage">
      <h1 className='heading'>Search by book name:</h1>
      <input 
        type="text"
        value={searchInput}
        onChange={(e) => setSearchInput(e.target.value)} 
        className="search"
      />
      <div className='books'>
        {
          booksData && booksData.map((book, index) => {
            const inShelf = isBookInShelf(book);
            return (
              <div key={index} className='book'>
                <div className='bookStyle'>
                  <span className='titles'>Book Title:</span>
                  <p className='titleContent'>{book.title}</p>
                </div>
                <div className='bookStyle'>
                  <span className='titles'>Author:</span>
                  <p className='titleContent'>{book.author_name}</p>
                </div>
                <div className='bookStyle'>
                  <span className='titles'>Edition Count:</span>
                  <p className='titleContent'>{book.edition_count}</p>
                </div>
                <button 
                  className={`${inShelf ? "removeFromBookshelf" : "addToBookShelf"}`} 
                  onClick={() => inShelf ? removeBookFromShelf(book) : addBookToShelf(book)}
                >
                  {inShelf ? "Remove from Bookshelf" : "Add to BookShelf"}
                </button>
              </div>
            )
          })
        }
      </div>
    </div>
  );
}

export default SearchPage;
