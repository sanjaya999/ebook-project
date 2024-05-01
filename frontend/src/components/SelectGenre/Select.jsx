import React, { useState } from 'react';
import axios from 'axios';
import './Select.css';
import { useNavigate } from 'react-router-dom';

const Select = () => {
  const navigate = useNavigate();
  const genres = ["Fiction", "Non-Fiction", "Romance", "Mystery", "Thriller", "Spritual", "Science and Technology"];
  const [selectedGenres, setSelectedGenres] = useState([]);

  const handleGenreChange = (genre) => {
    if (selectedGenres.includes(genre)) {
      setSelectedGenres(selectedGenres.filter((g) => g !== genre));
    } else {
      setSelectedGenres([...selectedGenres, genre]);
    }
  };

  const handleSubmit = async () => {
    try {
      const accessToken = localStorage.getItem('token');
      const userId = window.localStorage.getItem("userID");


      if (selectedGenres.length === 0) {
        setError('Please provide genres to update');
        return;
      }

      const config = {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
      };

      const response = await axios.put(
        `http://localhost:5000/api/v1/user/updateGenre`,
        { userId , genres: selectedGenres }, // Send the user ID in the request body
        
        config
      );

      console.log(response.data.data)
      if (response.status === 200) {
        console.log('Genres updated successfully!');
        navigate('/suggest'); // Redirect to the /suggest page
      } else {
        console.error('Error updating genres:', response.data);
      }
    } catch (error) {
      console.error('Error updating genres:', error);
    }
  };

  return (
    <div className="genre-selector">
      <h2>Select Genres</h2>
      <div className="genre-list">
        {genres.map((genre) => (
          <div
            key={genre}
            className={`genre-item ${selectedGenres.includes(genre) ? 'selected' : ''}`}
            onClick={() => handleGenreChange(genre)}
          >
            {genre}
          </div>
        ))}
      </div>
      <button onClick={handleSubmit}>Update Genres</button>
    </div>
  );
};

export default Select;