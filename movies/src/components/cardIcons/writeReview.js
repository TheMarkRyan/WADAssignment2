import React from "react";
import RateReviewIcon from "@mui/icons-material/RateReview";
import { Link } from "react-router-dom";

const WriteReviewIcon = ({ movie }) => {
  return (
    <Link
      to={`/reviews/form`}
      state={{
        movieId: movie.id, // Pass the movie ID as state to the form page
      }}
    >
      <RateReviewIcon color="primary" fontSize="large" />
    </Link>
  );
};

export default WriteReviewIcon;
