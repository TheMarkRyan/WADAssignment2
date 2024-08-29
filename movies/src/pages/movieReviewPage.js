import React from "react";
import { useLocation } from "react-router-dom";
import PageTemplate from "../components/templateMoviePage";
import MovieReview from "../components/movieReview";

const MovieReviewPage = () => {
  const location = useLocation();
  const { movie, review } = location.state;

  return (
    <PageTemplate movie={movie}>
      <h2>{movie.title}</h2>
      <MovieReview review={review} />
    </PageTemplate>
  );
};

export default MovieReviewPage;
