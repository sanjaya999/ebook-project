import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./Explore.css"


function Explore() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/v1/user/explore');
          setBooks(response.data.data);
          console.log(books);
          
       
      } catch (err) {
        console.error(err);
      }
    };

    fetchBooks();
  }, []);

  
  return (
    <div className="book-list-container">
  <h1 className="book-list-title">Book List</h1>
  <ul className="book-list">
    {books &&
      books.map((book, index) => (
        <li key={index} className="book-item">
          <h3 className="book-title">{book.bookName}</h3>
          <p className="book-description">Description: {book.description}</p>
          <p className="book-uploaded-by">Uploaded by: {book.uploadedBy}</p>
          <p className="book-created-at">Created at: {book.createdAt}</p>
          {/* Add more details you want to display */}
          <div className="book-image-container">
            <img
              className="book-image"
              src={book.bookImage}
              alt={book.bookName}
            />
            {/* Assuming bookImage is the URL to the book's image */}
          </div>
          <div className="book-download-link">
            <a
              href={book.bookFile}
              target="_blank"
              rel="noopener noreferrer"
              className="book-download-btn"
            >
              Download Book
            </a>
            {/* Assuming bookFile is the URL to the book's PDF file */}
          </div>
        </li>
      ))}
  </ul>
</div>
  )
};

export default Explore;