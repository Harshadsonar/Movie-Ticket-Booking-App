import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

// TO remove HTML Tags from the given API
const removeHtmlTags = (htmlString) => {
  const doc = new DOMParser().parseFromString(htmlString, 'text/html');
  return doc.body.textContent || "";
};

const ShowDetails = () => {
  const { showId } = useParams();
  const [show, setShow] = useState(null);

  useEffect(() => {
    fetch(`https://api.tvmaze.com/shows/${showId}`)
      .then((res) => res.json())
      .then((data) => setShow(data))
      .catch((error) => {
        console.error('Error fetching show details:', error);
        setShow(null);
      });
  }, [showId]);

  return (
    <div className="show-details">
      {show && (
        <div>
          <h1>{show.name}</h1>
          <img
            src={show.image ? show.image.medium : 'placeholder-image-url'}
            alt={show.name}
          />
          <h3>Language: {show.language}</h3>
          <h4>Rating : {show.rating.average}</h4>
          <h4>{show.genres.join(', ')}</h4>
          <h4>Day & Time: {show.schedule.days} {show.schedule.time} pm</h4>
          <p><b>Summary:</b> {removeHtmlTags(show.summary)}</p>
          <Link to={`/booking/${show.id}`}>
            <button className="btn">Book Movie Ticket</button>
          </Link>
        </div>
      )}
      {!show && <p>Show details not available</p>}
    </div>
  );
};

export default ShowDetails;
