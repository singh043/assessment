import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import SearchPage from './SearchPage';
import BookshelfPage from './BookshelfPage';

function App() {
  return (
    <Router>
      <div className="App">
        <nav>
          <Link to="/" className="navButton">
            <button className="navButtonStyle">Search Books</button>
          </Link>
          <Link to="/bookshelf" className="navButton">
            <button className="navButtonStyle">My Bookshelf</button>
          </Link>
        </nav>
        <Routes>
          <Route path="/" element={<SearchPage />} />
          <Route path="/bookshelf" element={<BookshelfPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;