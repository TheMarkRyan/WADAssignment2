import React, { useContext, useState } from "react";
import PageTemplate from "../components/templateMovieListPage";
import { MoviesContext } from "../contexts/moviesContext";
import { useQueries } from "react-query";
import { getMovie } from "../api/tmdb-api";
import Spinner from '../components/spinner';
import FilterMoviesCard from "../components/filterMoviesCard";

const FavoriteMoviesPage = () => {
  const {favorites: movieIds } = useContext(MoviesContext);
  const [sortBy, setSortBy] = useState("rating");

  const favoriteMovieQueries = useQueries(
    movieIds.map((movieId) => {
      return {
        queryKey: ["movie", { id: movieId }],
        queryFn: getMovie,
      };
    })
  );

  const isLoading = favoriteMovieQueries.find((m) => m.isLoading === true);

  if (isLoading) return <Spinner />;

  let movies = favoriteMovieQueries.map((q) => {
    q.data.genre_ids = q.data.genres.map(g => g.id);
    return q.data;
  });

  const handleSortChange = (type, value) => {
    if (type === "sort") setSortBy(value);
  };

  // Sorting logic based on the selected option
  movies = movies.sort((a, b) => {
    switch (sortBy) {
      case "rating":
        return b.vote_average - a.vote_average;
      case "boxOffice":
        return b.revenue - a.revenue;
      case "releaseDate":
        return new Date(b.release_date) - new Date(a.release_date);
      case "runtime":
        return b.runtime - a.runtime;
      default:
        return 0;
    }
  });

  return (
    <PageTemplate
      title="Favourite Movies"
      movies={movies}
      action={(movie) => true}
    >
      <FilterMoviesCard
        onUserInput={handleSortChange}
        titleFilter=""
        genreFilter="0"
        sortBy={sortBy}
      />
    </PageTemplate>
  );
};

export default FavoriteMoviesPage;
