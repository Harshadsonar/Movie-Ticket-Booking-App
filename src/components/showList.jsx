import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const ShowList = () => {
  const [shows, setShows] = useState([]);

  useEffect(() => {
    fetch('https://api.tvmaze.com/search/shows?q=all')
      .then((res) => res.json())
      .then((data) => setShows(data));
  }, []);

  return (
    <div className="show-list">
      {shows.map((show) => (
        <div key={show.show.id} className="show-card">
          <h2>{show.show.name}</h2>
          <img
            src={show.show.image ? show.show.image.medium : 'placeholder-image-url'}
            alt={show.show.name}
          />
          <h3>Language: {show.show.language}</h3>
          <h4>Rating : {show.show.rating.average}</h4>
          <h5>{show.show.genres.join(', ')}</h5>
          <h5>Day & Time: {show.show.schedule.days} {show.show.schedule.time} pm</h5>

          <Link to={`/show-details/${show.show.id}`}>
            <button className="btn">View Details</button>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default ShowList;
