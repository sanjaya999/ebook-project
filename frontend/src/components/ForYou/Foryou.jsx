import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./Foryou.css"

function Foryou() {
  const [books, setBooks] = useState([]);

  const genres = ["Fiction", "Non-Fiction", "Romance", "Mystery", "Thriller", "Spritual", "Science and Technology"];

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/v1/user/explore');
        setBooks(response.data.data);
        console.log(response.data.data)
        set
      } catch (err) {
        console.error(err);
      }
    };

    fetchBooks();
  }, []);


  const slide = (direction) => {
    const container = genreContainersRef.current;
    const scrollDistance = container.offsetWidth * direction;
    container.scrollLeft += scrollDistance;
  };

  return (
    <div className="foryou-book-list-container">
      <div className="foryou-genre-containers">
        {genres.map((genre, index) => (
          <div key={index} className="foryou-genre-container">
            <h2 className="foryou-genre-title">{genre}</h2>
            <div className="foryou-book-list">
              {books
                .filter((book) => book.genre === genre)
                .map((book, bookIndex) => (
                  <div key={bookIndex} className="foryou-book-item">
                    <h3 className="foryou-book-title">{book.bookName}</h3>
                    <div className="foryou-book-image-container">
                      <img className="foryou-book-image" src={book.bookImage} alt={book.bookName} />
                    </div>
                    <a
                      href={book.bookFile}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="foryou-book-download-btn"
                    >
                      Download Book
                    </a>
                  </div>
                ))}
            </div>
          </div>
        ))}
      </div>
      <button onClick={() => slide(-1)}>Previous</button>
      <button onClick={() => slide(1)}>Next</button>
    </div>
  );
}

export default Foryou;