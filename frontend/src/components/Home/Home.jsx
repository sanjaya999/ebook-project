import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Home.css';
import book from '../book.png';
import axios from 'axios';
import LoadingSpinner from '../Loading/LoadingSpinner';

function Home() {
  const [searchTerm, setSearchTerm] = useState('');
  const [books, setBooks] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const isLoggedIn = localStorage.getItem('loggedIn');
  const accessToken = localStorage.getItem('token');

  const handleSearch = async () => {
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
          `https://ebook-project-rho.vercel.app/api/v1/user/search?searchTerm=${searchTerm}`,
          config
        );
      } else {
        response = await axios.get(
          `https://ebook-project-rho.vercel.app/api/v1/user/search?searchTerm=${searchTerm}`
        );
      }

      setBooks(response.data.data);
      setIsLoading(false);
    } catch (err) {
      console.error(err);
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="logo">
        <img className="image" src={book} alt="" />
      </div>

      <div className="we">
        <p className="aboutus">We are world leading book room</p>
      </div>

      <div className="homelog">
        <p className="sign">
          <Link className="log" to="/Login">
            Login!
          </Link>{' '}
          to join us and show your writing!
        </p>
      </div>

      <div className="search">
        <input
          type="text"
          className="searchbook"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search For any books , articles , papers"
        />
        <button onClick={handleSearch} className="SButton">
          Search
        </button>

        {isLoading ? (
          <LoadingSpinner />
        ) : (
          <>
            {Array.isArray(books) && books.length > 0 ? (
              <ul className="book-list">
                {books.map((book) => (
                  <li key={book._id} className="book-item">
                    <div className="book-image-container">
                      <img
                        className="book-image"
                        src={book.bookImage}
                        alt={book.bookName}
                      />
                    </div>
                    <div className="book-details">
                      <h3 className="book-title">{book.bookName}</h3>
                      <p className="book-description">{book.description}</p>
                      {isLoggedIn === 'true' && (
                        <a
                          className="book-download"
                          href={book.bookFile}
                          target="_blank"
                          rel="noopener noreferrer"
                          download=""
                        >
                          Read Book
                        </a>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <p>No books found</p>
            )}
          </>
        )}
      </div>
      <div className="download-app">
  <a
    href="/ebook.apk"
    className="download-link"
    download
  >
    📱 Download Android App - Click Here
  </a>
</div>


      <div className="section">
        <Link to="/top" className="Top100">
          Top 100
        </Link>
        <div className="request">Request Book</div>
      </div>
    </>
  );
}

export default Home;