import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Movie from './Movie';

function MovieList() {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    axios.get('http://localhost:5000/movies?_embed=reviews') // Fetch reviews along with movies
      .then((response) => {
        setMovies(response.data);
      })
      .catch((error) => {
        console.error('Error fetching movies:', error);
      });
  }, []);

  const filteredMovies = movies.filter(movie =>
    movie.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      

      {/* Search Bar */}
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search movies..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <ul>
        {filteredMovies.map((movie) => (
          <Movie key={movie.id} movie={movie} />
        ))}
      </ul>
    </div>
  );
}

export default MovieList;
