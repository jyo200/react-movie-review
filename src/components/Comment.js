// Comment.js
import React, { useState } from 'react';

function Comment({ recipeId, addComment }) {
  const [comment, setComment] = useState('');

  const handleCommentChange = (e) => {
    setComment(e.target.value);
  };

  const handleSubmit = () => {
    // Send the comment to the server and save it in the db.json file
    fetch('http://localhost:5000/comments', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        recipeId,
        comment,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        addComment(data); // Update the comment list in the parent component
        setComment(''); // Clear the input field
      });
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Add a comment..."
        value={comment}
        onChange={handleCommentChange}
      />
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
}

export default Comment;
