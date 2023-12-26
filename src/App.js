import React from 'react';
import './App.css';
import MovieList from './components/MovieList';

function App() {
  return (
    <div className="App">
      <div className="container">
        <h1>Movie Reviews</h1>
        <MovieList />
      </div>
    </div>
  );
}

export default App;
