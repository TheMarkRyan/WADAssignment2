import React from "react";
import { useQuery } from "react-query";
import { getRecommendedMovies } from "../api/tmdb-api";
import Spinner from "../components/spinner";
import PageTemplate from "../components/templateMovieListPage";
import AddToFavoritesIcon from "../components/cardIcons/addToFavorites";
import { useParams } from "react-router-dom";
import FilterMoviesCard from "../components/filterMoviesCard";

const RecommendationsPage = () => {
  const { movieId } = useParams(); // Get the movie ID from the URL

  const { data, error, isLoading, isError } = useQuery(
    ["recommendedMovies", { movieId }],
    () => getRecommendedMovies(movieId) // Fetch recommendations based on movieId
  );

  if (isLoading) return <Spinner />;
  if (isError) return <h1>{error.message}</h1>;

  const movies = data?.results || [];

  return (
    <PageTemplate
      title="Recommended Movies"
      movies={movies}
      action={(movie) => <AddToFavoritesIcon movie={movie} />}
    >
      {/* Include the FilterMoviesCard for filtering */}
      <FilterMoviesCard
        onUserInput={() => {}} // Handle input as needed for filtering
        titleFilter=""
        genreFilter="0"
      />
    </PageTemplate>
  );
};

export default RecommendationsPage;
