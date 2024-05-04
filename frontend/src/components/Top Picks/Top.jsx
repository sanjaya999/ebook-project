import React, { useState, useEffect } from 'react';
import axios from 'axios';
import LoadingSpinner from '../Loading/LoadingSpinner';
import './Top.css';

function Top() {
  const [books, setBooks] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const isLoggedIn = localStorage.getItem('loggedIn');
  const accessToken = localStorage.getItem('token');

  useEffect(() => {
    const fetchBooks = async () => {
      setIsLoading(true);

      try {
        let response;
        if (isLoggedIn === 'true') {
          const config = {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          };
          response = await axios.get(
            'http://localhost:5000/api/v1/user/topPicks',
            config
          );
          const filteredBooks = response.data.data.filter(book => book.approved === true);
          const sortedBooks = filteredBooks.sort((a, b) => b.accessCount - a.accessCount);
          setBooks(sortedBooks); 
        } else {
          response = await axios.get('http://localhost:5000/api/v1/user/notLoggedin');
          console.log(response.data.data)
          const filteredBooks = response.data.data.filter(book => book.approved === true);
          const sortedBooks = filteredBooks.sort((a, b) => b.accessCount - a.accessCount);
          setBooks(sortedBooks); 

        }
        
        
        setIsLoading(false);
      } catch (err) {
        console.error(err);
        setIsLoading(false);
      }
    };

    fetchBooks();
  }, [isLoggedIn, accessToken]);

  const handleBookClick = (bookFile) => {
    window.open(bookFile, '_blank');
  };

  return (
    <div className="app-top-book-list-container">
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <>
          <h1 className="app-top-book-list-title">Top Picks</h1>
          <div className="app-top-book-list">
            {books.map((book, index) => (
              <div key={index} className="app-top-book-item">
                <div className="app-top-book-image-container">
                  <img
                    className="app-top-book-image"
                    src={book.bookImage}
                    alt={book.bookName}
                  />
                </div>
                <div className="app-top-book-details">
                  <h3 className="app-top-book-title">{book.bookName}</h3>
                  <p className="app-top-book-description">
                    Description: {book.description}
                  </p>
                  <p className="app-top-book-access-count">
                    Access Count: {book.accessCount}
                  </p>
                  {isLoggedIn === 'true' && (
                    <div className="app-top-book-download-link">
                      <button
                        className="app-top-book-download-btn"
                        onClick={() => handleBookClick(book.bookFile)}
                      >
                        Read Book
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default Top;