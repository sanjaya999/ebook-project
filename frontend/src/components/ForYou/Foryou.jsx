import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import "./Foryou.css";
import LoadingSpinner from '../Loading/LoadingSpinner';

function Foryou() {
  const [books, setBooks] = useState([]);
  const genreContainersRef = useRef({});
  const [isLoading, setIsLoading] = useState(false);
  const isLoggedIn = localStorage.getItem('loggedIn');
  const accessToken = localStorage.getItem('token');

  const genres = ["Fiction", "Non-Fiction", "Romance", "Mystery", "Thriller", "Spiritual", "Science and Technology"];

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
          isLoggedIn === 'true'
            ? 'http://localhost:5000/api/v1/user/explore'
            : 'http://localhost:5000/api/v1/user/notLoggedin',
          isLoggedIn === 'true' ? config : {}
        );
        const filterBook = response.data.data.filter(book => book.approved === true);
        setBooks(filterBook);
        setIsLoading(false);
      } catch (err) {
        console.error(err);
        alert("error fetching books ");
      }
    };

    fetchBooks();
  }, [isLoggedIn, accessToken]);

  const slide = (genre, direction) => {
    const container = genreContainersRef.current[genre];
    const scrollDistance = container.offsetWidth * 0.7 * direction; // Adjust scroll speed/magnitude here
    container.scrollBy({
      left: scrollDistance,
      behavior: 'smooth'
    });
  };

  return (
    <div className="foryou-book-list-container">
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <>
          {genres.map((genre, index) => (
            <div key={index} className="foryou-genre-container">
              <h2 className="foryou-genre-title">{genre}</h2>
              <div
                className="foryou-book-list"
                ref={el => genreContainersRef.current[genre] = el} // Assign ref to the container
              >
                {books
                  .filter(book => book.genre === genre)
                  .map((book, bookIndex) => (
                    <div key={bookIndex} className="foryou-book-item">
                      <h3 className="foryou-book-title">{book.bookName}</h3>
                      <div className="foryou-book-image-container">
                        <img className="foryou-book-image" src={book.bookImage || ''} alt={book.bookName} />
                      </div>
                      {isLoggedIn === 'true' && (
                        <a
                          href={book.bookFile}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="foryou-book-download-btn"
                        >
                          Download Book
                        </a>
                      )}
                    </div>
                  ))}
              </div>
              <button className="FYP" onClick={() => slide(genre, -1)}>Previous</button>
              <button className="FYN" onClick={() => slide(genre, 1)}>Next</button>
            </div>
          ))}
        </>
      )}
    </div>
  );
}

export default Foryou;