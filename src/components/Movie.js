import React, { useState,useEffect } from 'react';
import axios from 'axios';
import './Movie.css';

function Movie({ movie }) {
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState([]);

  useEffect(() => {
    // Fetch comments for the current movie
    axios.get(`http://localhost:5000/movies/${movie.id}/reviews`)
      .then((response) => {
        setComments(response.data);
      })
      .catch((error) => {
        console.error('Error fetching comments:', error);
      });
  }, [movie.id]);

  const handleCommentSubmit = () => {
    if (comment) {
      const newComment = {
        id: Date.now(),
        text: comment,
      };
      setComments([...comments, newComment]);
      setComment('');

      // Send the new comment to the server (POST request)
      axios.post(`http://localhost:5000/movies/${movie.id}/reviews`, newComment)
        .then((response) => {
          console.log('Comment added successfully:', response.data);
        })
        .catch((error) => {
          console.error('Error adding comment:', error);
        });
    }
  };

  return (
    <div className="movie-container">
      <div className="movie">
        <img className="movie-image" src={movie.image} alt={movie.title} />
        <div className="movie-info">
          <h3>{movie.title} ({movie.year})</h3>
          <p><b>Director: </b>{movie.director}</p>
          <p><b>Rating:</b> {movie.rating}</p>
          <p><b>Description:</b></p>
          <p>{movie.description}</p>
        </div>

        <div className="comment-section">
          <input
            type="text"
            placeholder="Add a comment..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
          <button onClick={handleCommentSubmit}>Add Comment</button>

          <div className="comments">
            <h4>Comments:</h4>
            <ul>
              {comments.map((comment) => (
                <li key={comment.id}>{comment.text}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Movie;
