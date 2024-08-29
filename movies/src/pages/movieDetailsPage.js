import React, { useState } from "react";
import { useParams } from "react-router-dom";
import MovieDetails from "../components/movieDetails/";
import PageTemplate from "../components/templateMoviePage";
import { getMovie, getRecommendedMovies, getSimilarMovies } from "../api/tmdb-api";
import { useQuery } from "react-query";
import Spinner from '../components/spinner';
import Drawer from '@mui/material/Drawer';
import MovieReviews from "../components/movieReviews";
import MovieList from "../components/movieList";
import Grid from "@mui/material/Grid";

const MoviePage = () => {
  const { id } = useParams();
  const [showReviews, setShowReviews] = useState(false);

  // Fetch movie details
  const { data: movie, error: movieError, isLoading: movieLoading, isError: movieIsError } = useQuery(
    ["movie", { id }],
    getMovie
  );

  // Fetch recommended movies
  const { data: recommendedMovies } = useQuery(
    ["recommendedMovies", { id }],
    () => getRecommendedMovies(id),
    { enabled: !!movie } // Only fetch if movie data is available
  );

  // Fetch similar movies
  const { data: similarMovies } = useQuery(
    ["similarMovies", { id }],
    () => getSimilarMovies(id),
    { enabled: !!movie }
  );

  if (movieLoading) return <Spinner />;
  if (movieIsError) return <h1>{movieError.message}</h1>;

  // Limit the number of similar and recommended movies
  const limitedRecommendedMovies = recommendedMovies?.results.slice(0, 4) || [];
  const limitedSimilarMovies = similarMovies?.results.slice(0, 4) || [];

  return (
    <>
      {movie ? (
        <PageTemplate movie={movie}>
          <MovieDetails movie={movie} setShowReviews={setShowReviews} />

          {showReviews && (
            <Drawer anchor="top" open={showReviews} onClose={() => setShowReviews(false)}>
              <MovieReviews movieId={id} />
            </Drawer>
          )}

          {/* Display Recommended Movies */}
          <div className="movie-details-container">
            <h3>Recommended Movies</h3>
            <Grid container spacing={2} className="recommended-movies">
              {limitedRecommendedMovies.length > 0 ? (
                <MovieList movies={limitedRecommendedMovies} />
              ) : (
                <p>No recommended movies available.</p>
              )}
            </Grid>

            {/* Display Similar Movies */}
            <h3>Similar Movies</h3>
            <Grid container spacing={2} className="similar-movies">
              {limitedSimilarMovies.length > 0 ? (
                <MovieList movies={limitedSimilarMovies} />
              ) : (
                <p>No similar movies available.</p>
              )}
            </Grid>
          </div>
        </PageTemplate>
      ) : (
        <p>Waiting for movie details...</p>
      )}
    </>
  );
};

export default MoviePage;
