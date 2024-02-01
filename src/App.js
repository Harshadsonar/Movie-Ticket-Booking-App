import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import BookingForm from './components/BookingForm';
import ShowDetails from './components/showDetails';
import './App.css';
import ShowList from './components/showList';

function App() {
  return (
    <Router>
      <div className="App">
      <h1>TV Shows</h1>
        <Routes>
          <Route path="/" exact element={<ShowList />} />
          <Route path="/show-details/:showId" element={<ShowDetails />} />
          <Route path="/booking/:showId" element={<BookingForm />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
