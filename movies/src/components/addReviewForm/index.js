import React, { useState } from "react";
import { TextField, Button, Box, Typography } from "@mui/material";

const AddReviewForm = ({ movieId, onSubmit }) => {
  const [reviewText, setReviewText] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (reviewText.trim()) {
      onSubmit(reviewText);
      setReviewText(""); // Reset the text field after submission
    }
  };

  return (
    <Box sx={{ padding: "20px", backgroundColor: "rgba(255, 255, 255, 0.1)", borderRadius: "10px", color: "#fff" }}>
      <Typography variant="h6" sx={{ marginBottom: "10px" }}>
        Write your review
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          variant="outlined"
          fullWidth
          multiline
          rows={4}
          placeholder="Share your thoughts about the movie..."
          value={reviewText}
          onChange={(e) => setReviewText(e.target.value)}
        />
        <Button type="submit" variant="contained" sx={{ marginTop: "10px" }}>
          Submit Review
        </Button>
      </form>
    </Box>
  );
};

export default AddReviewForm;
