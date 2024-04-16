import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Explore.css';
import LoadingSpinner from '../Loading/LoadingSpinner';
import { useNavigate } from 'react-router-dom';

function Explore() {
  const [books, setBooks] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [bookmarkedIds, setBookmarks] = useState([]);

  const navigate = useNavigate();
  const isLoggedIn = localStorage.getItem('loggedIn');
  const accessToken = localStorage.getItem('token');

  useEffect(() => {
    const fetchBooks = async () => {
      setIsLoading(true);

      try {
        const config = {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        };
        const response = await axios.get(
          'http://localhost:5000/api/v1/user/explore',
          config
        );
        const filterBook = response.data.data.filter((book) => book.approved === true);
        setBooks(filterBook);
        setIsLoading(false);
      } catch (err) {
        console.error(err);
        setIsLoading(false);
      }
    };

    const fetchBookmarks = async () => {
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
          },
        };
  
        const userId = window.localStorage.getItem("userID");
  
        const response = await axios.post(
          `http://localhost:5000/api/v1/user/bookmarks`,
          { userId }, // Send the user ID in the request body
          config
        );
  
        console.log("this is fetch book" ,response.data.data);
        setBookmarks(response.data.data.bookmarks);
      } catch (error) {
        console.error('Error fetching bookmarks:', error);
      }
    };
  
  

    if (isLoggedIn === 'true') {
      fetchBooks();
      fetchBookmarks();    } else {
      const fetchNotLoggedInBooks = async () => {
        try {
          const response = await axios.get(
            'http://localhost:5000/api/v1/user/notLoggedin'
          );
          const filterBook = response.data.data.filter((book) => book.approved === true);
          setBooks(filterBook);
          setIsLoading(false);
        } catch (err) {
          console.error(err);
          setIsLoading(false);
        }
      };
      fetchNotLoggedInBooks();
    }
  }, [isLoggedIn, accessToken]);

  const handleBookClick = (bookFile) => {
    window.open(bookFile, '_blank');
  };

  const handleBookmarkClick = async (bookId) => {
    try {
     
      const config = {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      };
      

      const isBookmarked = bookmarkedIds.includes(bookId);
      const response = await axios({
        method: isBookmarked ? 'DELETE' : 'POST',
        url: `http://localhost:5000/api/v1/user/bookmarks/${ bookId }`,
        headers: config.headers,
        
      });

      if (response.status === 200) {
        if (isBookmarked) {
          setBookmarks(bookmarkedIds.filter((id) => id !== bookId));
        } else {
          setBookmarks([...bookmarkedIds, bookId]);
        }
      }
    } catch (error) {
      console.error('Error updating bookmark:', error);
    }
  };

  return (
    <div className="app-explore-book-list-container">
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <>
          <h1 className="app-explore-book-list-title">Book List</h1>
          <ul className="app-explore-book-list">
            {books.map((book, index) => (
              <li key={index} className="app-explore-book-item">
                <div className="app-explore-book-image-container">
                  <img
                    className="app-explore-book-image"
                    src={book.bookImage}
                    alt={book.bookName}
                  />
                </div>
                <h3 className="app-explore-book-title">{book.bookName}</h3>
                <p className="app-explore-book-description">
                  Description: {book.description}
                </p>
                <p className="app-explore-book-uploaded-by">
                  Uploaded by: {book.uploadedBy}
                </p>
                {isLoggedIn === 'true' && (
                  <div className="app-explore-book-download-link">
                    <button
                      className={bookmarkedIds.includes(book._id) ? 'bookmarked' : ''}
                      onClick={() => handleBookmarkClick(book._id)}
                    >
                      {bookmarkedIds.includes(book._id) ? 'Bookmarked' : 'Bookmark'}
                    </button>
                    <button
                      className="app-explore-book-download-btn"
                      onClick={() => handleBookClick(book.bookFile)}
                    >
                      Download Book
                    </button>
                  </div>
                )}
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}

export default Explore;