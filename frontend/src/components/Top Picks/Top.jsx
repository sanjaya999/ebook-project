import React, { useEffect, useState } from 'react';
import axios from 'axios';

const TopPicks = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get('https://ebook-project-taupe.vercel.app/api/v1/user/topPicks');
        console.log(response.data.data)
        setBooks(response.data.data);

      } catch (error) {
        console.error('Error fetching books:', error);
      }
    };

    fetchBooks();
  }, []);

  return (
    <div>
    <h1>Top Picks</h1>
    <ul className="book-list">
      {Array.isArray(books) && books.length > 0 ? (
        books.map((book) => (
          <li key={book._id} className="book-item">
            <div className="book-image-container">
              <img src={book.bookImage} alt={book.bookName} className="book-image" />
            </div>
            <div className="book-details">
              <h2 className="book-title">{book.bookName}</h2>
              <p>{book.description}</p>
              <p>Access Count: {book.accessCount}</p>
              <a href={book.bookFile} target="_blank" rel="noopener noreferrer" className="book-download">
                Download Book
              </a>
            </div>
          </li>
        ))
      ) : (
        <p>No books found.</p>
      )}
    </ul>
  </div>
  );
};

export default TopPicks;