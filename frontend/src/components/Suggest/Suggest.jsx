import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Suggest.css';
import { useNavigate } from 'react-router-dom';


const Suggest = () => {
  const [books, setBooks] = useState([]);
  const [bookmarkedIds, setBookmarkedIds] = useState([]);

  const accessToken = localStorage.getItem('token');
  const navigate = useNavigate();


  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const config = {
            headers: {
              Authorization: `Bearer ${accessToken}`,
              'Content-Type': 'application/json',
            },
          };
  
          const userId = window.localStorage.getItem("userID");
          console.log("this is fetch" + userId);
  
          const response = await axios.post(
            `https://ebook-project-rho.vercel.app/api/v1/user/fetchGenre`,
            { userId },
            config
          );
        const books = response.data.data;
        setBooks(books);
      } catch (error) {
        console.error('Error fetching books:', error);
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
          `https://ebook-project-rho.vercel.app/api/v1/user/getbookmarks`,
          { userId },
          config
        );

        const fetchedBookmarkIds = response.data.data.bookmarks.map(bookmark => bookmark._id);
        setBookmarkedIds(fetchedBookmarkIds);
      } catch (error) {
        console.error('Error fetching bookmarks:', error);
      }
    };

    fetchBooks();
    fetchBookmarks();
  }, [accessToken]);

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
        url: `https://ebook-project-rho.vercel.app/api/v1/user/bookmarks/${bookId}`,
        headers: config.headers,
      });

      if (response.status === 200) {
        if (isBookmarked) {
          setBookmarkedIds(bookmarkedIds.filter((id) => id !== bookId));
        } else {
          setBookmarkedIds([...bookmarkedIds, bookId]);
        }
      }
    } catch (error) {
      console.error('Error updating bookmark:', error);
    }
  };

  const handleTryDifferentGenre = () => {
    navigate('/select');
  };

  return (
    <div className="app-suggest-book-list-container">
        <button className="try-different-genre-btn" onClick={handleTryDifferentGenre}>
        Try Different Genre ?
      </button>
      <h2 className="app-suggest-book-list-title">Books Based on Your Genres</h2>
      {books.length === 0 ? (
        <p>No books found for your selected genres.</p>
      ) : (
        <ul className="app-suggest-book-list">
          {books.map((book) => (
            <li key={book._id} className="app-suggest-book-item">
              <div className="app-suggest-book-image-container">
                <img
                  className="app-suggest-book-image"
                  src={book.bookImage}
                  alt={book.bookName}
                />
              </div>
              <h3 className="app-suggest-book-title">{book.bookName}</h3>
              <div className="app-suggest-book-download-link">
                <button
                  className={bookmarkedIds.includes(book._id) ? 'bookmarked' : ''}
                  onClick={() => handleBookmarkClick(book._id)}
                >
                  {bookmarkedIds.includes(book._id) ? 'Bookmarked' : 'Bookmark'}
                </button>
                <button
                  className="app-suggest-book-download-btn"
                  onClick={() => handleBookClick(book.bookFile)}
                >
                 Read Book
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Suggest;