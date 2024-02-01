import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const BookingForm = () => {
    const { showId } = useParams();
  const [movieDetails, setMovieDetails] = useState(null);
  const [formData, setFormData] = useState({
    movieName:'',
    userName:'',
  });

  useEffect(() => {
    fetch(`https://api.tvmaze.com/shows/${showId}`)
      .then((res) => res.json())
      .then((data) => setMovieDetails(data))
      .catch((error) => {
        console.error('Error fetching additional details:', error);
        setMovieDetails(null);
      });
  }, [showId]);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const formData = {
        movieName: e.target.movieName.value,
        userName: e.target.userName.value,
    }
    
   
    localStorage.setItem('bookingDetails', JSON.stringify(formData));
  };
  const handleChange = (e) => {
    // Update formData state when form fields change
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="booking-form">
      <h1>Book Movie Ticket</h1>
      {movieDetails && (
        <form onSubmit={handleSubmit}>
          <label htmlFor="movieName">Movie Name:</label>
          <input
            type="text"
            id="movieName"
            name="movieName"
            value={movieDetails.name}
            readOnly
          />
          <label htmlFor="userName">Your Name:</label>
          <input
            type="text"
            id="userName"
            name="userName"
            value={formData.userName}
            onChange={handleChange}
            placeholder='Enter Your Name'
            required
          />
          <button type="submit" className="btn">
            Confirm Booking
          </button>
        </form>
      )}
      {!movieDetails && <p>Loading...</p>}
    </div>
  );
};

export default BookingForm;
