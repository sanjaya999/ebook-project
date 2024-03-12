import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./Explore.css"


function Explore() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get('https://ebook-project-taupe.vercel.app/api/v1/user/explore');
          setBooks(response.data.data);
          console.log(books);
          
       
      } catch (err) {
        console.error(err);
      }
    };

    fetchBooks();
  }, []);

  
  return (
    <div className="app-explore-book-list-container">
    <h1 className="app-explore-book-list-title">Book List</h1>
    <ul className="app-explore-book-list">
      {books &&
        books.map((book, index) => (
          <li key={index} className="app-explore-book-item">
            <h3 className="app-explore-book-title">{book.bookName}</h3>
            <p className="app-explore-book-description">Description: {book.description}</p>
            <p className="app-explore-book-uploaded-by">Uploaded by: {book.uploadedBy}</p>
            <p className="app-explore-book-created-at">Created at: {book.createdAt}</p>
            <div className="app-explore-book-image-container">
              <img
                className="app-explore-book-image"
                src={book.bookImage}
                alt={book.bookName}
              />
            </div>
            <div className="app-explore-book-download-link">
              <a
                href={book.bookFile}
                target="_blank"
                rel="noopener noreferrer"
                className="app-explore-book-download-btn"
              >
                Download Book
              </a>
            </div>
          </li>
        ))}
    </ul>
  </div>
  )
};

export default Explore;