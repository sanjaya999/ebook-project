import React, { useState } from 'react';
import "./Upload.css"
import axios from 'axios';
import LoadingSpinner from '../Loading/LoadingSpinner';

function Upload() {
  const token = window.localStorage.getItem("token");
  const _id = window.localStorage.getItem("userID");

  const [book, setBook] = useState({
    bookName: "",
    bookDescription: "",
    bookImage: null,
    bookFile: null,
    genre: "" // Add this line
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleImageChange = (event) => {
    setBook({ ...book, bookImage: event.target.files[0] });
  };

  const handleFileChange = (event) => {
    setBook({ ...book, bookFile: event.target.files[0] });
  };

  const handleBook = (e) => {
    const { name, value } = e.target;
    setBook({
      ...book,
      [name]: value
    });
  };

  const handleGenreChange = (e) => {
    setBook({ ...book, genre: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    console.log(book);

    try {
      const formData = new FormData();
      formData.append('bookName', book.bookName);
      formData.append('description', book.bookDescription);
      formData.append('bookImage', book.bookImage);
      formData.append('bookFile', book.bookFile);
      formData.append('genre', book.genre); // Add genre to the form data

      const response = await axios.post('http://localhost:5000/api/v1/user/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${token}`
        }
      });
      console.log("book upload successful", response.data);
      if (response) {
        alert("uploaded successfully");
        setIsLoading(false);
      }

    } 
    
    catch (error) {
      console.log(" book upload failed", error);

      setIsLoading(false);
      alert("book upload failed (Try with less mb file)   ")

      
    } 
  };

  const genres = ["Fiction", "Non-Fiction", "Romance", "Mystery", "Thriller", "Spritual" , "Science and Technology"]; 

  return (
    <div className="upload-container">

{isLoading ? (
        <LoadingSpinner />
      ) : ( <>
      <h2>Upload Your Own</h2>
      {error && <p className="error-message">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="bookName">Book Name:</label>
          <input
            name='bookName'
            type="text"
            id="bookName"
            value={book.bookName}
            onChange={handleBook}
          />
        </div>
        <div>
          <label htmlFor="bookDescription">Book Description:</label>
          <textarea
            name='bookDescription'
            id="bookDescription"
            value={book.bookDescription}
            onChange={handleBook}
          />
        </div>

        <div>
          <label htmlFor="bookImage">Book Image:</label>
          <input
            type="file"
            id="bookImage"
            onChange={handleImageChange}
          />
        </div>

        <div>
          <label htmlFor="bookFile">Book File:</label>
          <input
            type="file"
            id="bookFile"
            onChange={handleFileChange}
            accept=".pdf"
          />
        </div>

        <div>
          <label htmlFor="genre">Genre:</label>
          <select
            id="genre"
            name="genre"
            value={book.genre}
            onChange={handleGenreChange}
          >
            <option value="">Select a genre</option>
            {genres.map((genre) => (
              <option key={genre} value={genre}>
                {genre}
              </option>
            ))}
          </select>
        </div>

        <button type="submit">Upload</button>
      </form>
      </>
      )}
    </div>
  );
}

export default Upload;