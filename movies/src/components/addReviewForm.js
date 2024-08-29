import React, { useState, useEffect } from "react";
import { TextField, Button, Box, Typography, Card, CardContent, CardActions } from "@mui/material";

const AddReviewForm = ({ movieId }) => {
  const [reviewText, setReviewText] = useState("");
  const [submittedReviews, setSubmittedReviews] = useState([]);
  const [editIndex, setEditIndex] = useState(null);

  // Load the review from localStorage when the component mounts
  useEffect(() => {
    const storedReviews = JSON.parse(localStorage.getItem(`reviews-${movieId}`)) || [];
    setSubmittedReviews(storedReviews);
  }, [movieId]);

  // Save reviews to localStorage whenever the reviews state changes
  useEffect(() => {
    localStorage.setItem(`reviews-${movieId}`, JSON.stringify(submittedReviews));
  }, [submittedReviews, movieId]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (reviewText.trim()) {
      if (editIndex !== null) {
        // Edit existing review
        const updatedReviews = [...submittedReviews];
        updatedReviews[editIndex] = reviewText;
        setSubmittedReviews(updatedReviews);
        setEditIndex(null);
      } else {
        // Add new review
        setSubmittedReviews([...submittedReviews, reviewText]);
      }
      setReviewText(""); // Reset the text field after submission
    }
  };

  const handleEdit = (index) => {
    setReviewText(submittedReviews[index]);
    setEditIndex(index);
  };

  const handleDelete = (index) => {
    const updatedReviews = submittedReviews.filter((_, i) => i !== index);
    setSubmittedReviews(updatedReviews);
  };

  return (
    <Box
      sx={{
        backgroundColor: "rgba(255, 255, 255, 0.1)", // White background with slight transparency
        padding: "20px",
        borderRadius: "10px",
        color: "#fff", // White text color
        marginTop: "20px",
      }}
    >
      <Typography variant="h6" sx={{ color: "#fff", marginBottom: "10px" }}>
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
          sx={{
            input: { color: "#fff" }, // White input text
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderColor: "#fff", // White border for the input field
              },
              "&:hover fieldset": {
                borderColor: "#fff", // White border on hover
              },
            },
          }}
        />
        <Button
          type="submit"
          variant="contained"
          sx={{
            backgroundColor: "#fff",
            color: "#000",
            marginTop: "10px",
            "&:hover": {
              backgroundColor: "#f0f0f0",
            },
          }}
        >
          {editIndex !== null ? "Update Review" : "Submit Review"}
        </Button>
      </form>

      {submittedReviews.length > 0 && (
        <Box sx={{ marginTop: "20px" }}>
          <Typography variant="h6" sx={{ color: "#fff", marginBottom: "10px" }}>
            Your Review
          </Typography>
          {submittedReviews.map((review, index) => (
            <Card key={index} sx={{ marginBottom: "10px" }}>
              <CardContent>
                <Typography variant="body1">{review}</Typography>
              </CardContent>
              <CardActions>
                <Button onClick={() => handleEdit(index)} variant="contained" color="primary">
                  Edit
                </Button>
                <Button onClick={() => handleDelete(index)} variant="contained" color="secondary">
                  Delete
                </Button>
              </CardActions>
            </Card>
          ))}
        </Box>
      )}
    </Box>
  );
};

export default AddReviewForm;
