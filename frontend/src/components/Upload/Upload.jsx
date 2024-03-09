import React from 'react'
import  { useState } from 'react';
import "./Upload.css"

function Upload() {
    const [bookName, setBookName] = useState('');
    const [bookDescription, setBookDescription] = useState('');
    const [bookFile, setBookFile] = useState(null);
  
    const handleBookNameChange = (e) => {
      setBookName(e.target.value);
    };
  
    const handleBookDescriptionChange = (e) => {
      setBookDescription(e.target.value);
    };
  
    const handleBookFileChange = (e) => {
      setBookFile(e.target.files[0]);
    };
  
    const handleSubmit = (e) => {
      e.preventDefault();
      // Handle form submission and file upload here
      console.log('Book Name:', bookName);
      console.log('Book Description:', bookDescription);
      console.log('Book File:', bookFile);
    };


  return (
    <div className="upload-container">
    <h2>Upload Your Own</h2>
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="bookName">Book Name:</label>
        <input
          type="text"
          id="bookName"
          value={bookName}
          onChange={handleBookNameChange}
        />
      </div>
      <div>
        <label htmlFor="bookDescription">Book Description:</label>
        <textarea
          id="bookDescription"
          value={bookDescription}
          onChange={handleBookDescriptionChange}
        />
      </div>
      <div>
        <label htmlFor="bookFile">Book File:</label>
        <input
          type="file"
          id="bookFile"
          onChange={handleBookFileChange}
          accept=".pdf"
        />
      </div>
      <button type="submit">Upload</button>
    </form>

    </div>
  )
}

export default Upload