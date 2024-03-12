import React from 'react'
import  { useState } from 'react';
import "./Upload.css"
import axios from 'axios';

function Upload() {
  const token = window.localStorage.getItem("token");
  const _id = window.localStorage.getItem("userID");

    const [Book, setBook] = useState({
      bookName :"",
      bookDescription :"",
      bookImage :null,
      bookFile :null
    });
  
    const handleImageChange = (event) => {
      setBook({ ...Book, 
        bookImage: event.target.files[0] 
      });
    };
  
    // Function to handle changes in bookFile input
    const handleFileChange = (event) => {
      setBook({ ...Book, 
        bookFile: event.target.files[0] 
      });
    };

    const handleBook =(e)=>{
        const {name , value} = e.target
        setBook({
          ...Book,
          [name] : value
        })
    }
    
    const handleSubmit = async(e) => {
      e.preventDefault();
      console.log(Book);

      try {

        const formData = new FormData();
        formData.append('bookName', Book.bookName);
        formData.append('description', Book.bookDescription);
        formData.append('bookImage', Book.bookImage);
        formData.append('bookFile', Book.bookFile);
    
    
        const response = await axios.post('http://localhost:5000/api/v1/user/upload',formData,{
          headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': `Bearer ${token}`
          }
    
        })
        console.log("book upload successfull",response.data)
        if(response){
          alert("uploaded successfully")
        }
      } catch (error) {
        console.log(" book upload failed",error)
        
      }
    };

      

  return (
    <div className="upload-container">
    <h2>Upload Your Own</h2>
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="bookName">Book Name:</label>
        <input name='bookName'
          type="text"
          id="bookName"
          value={Book.bookName}
          onChange={handleBook}
        />
      </div>
      <div>
        <label htmlFor="bookDescription">Book Description:</label>
        <textarea name='bookDescription'
          id="bookDescription"
          value={Book.bookDescription}
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
      <button type="submit">Upload</button>
    </form>

    </div>
  )
}

export default Upload