import React, { useState } from "react";
import { useQuery } from "react-query";
import { getUpcomingMovies, getMoviesByGenre } from "../api/tmdb-api";
import Spinner from "../components/spinner";
import PageTemplate from "../components/templateMovieListPage";
import AddToFavoritesIcon from "../components/cardIcons/addToFavorites";
import FilterMoviesCard from "../components/filterMoviesCard";

const UpcomingMoviesPage = () => {
  const [nameFilter, setNameFilter] = useState("");
  const [genreFilter, setGenreFilter] = useState("0");
  const [sortBy, setSortBy] = useState("rating");
  const genreId = Number(genreFilter);

  const { data, error, isLoading, isError } = useQuery(
    ["upcoming", genreId],
    () => genreId > 0 ? getMoviesByGenre(genreId) : getUpcomingMovies()
  );

  if (isLoading) return <Spinner />;
  if (isError) return <h1>{error.message}</h1>;

  let movies = data?.results || [];
  movies = movies.filter((m) => m.title.toLowerCase().includes(nameFilter.toLowerCase()));

  const handleChange = (type, value) => {
    if (type === "name") setNameFilter(value);
    if (type === "genre") setGenreFilter(value);
    if (type === "sort") setSortBy(value);
  };

  // Sorting logic
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
      title="Upcoming Movies"
      movies={movies}
      action={(movie) => <AddToFavoritesIcon movie={movie} />}
    >
      <FilterMoviesCard
        onUserInput={handleChange}
        titleFilter={nameFilter}
        genreFilter={genreFilter}
        sortBy={sortBy}
      />
    </PageTemplate>
  );
};

export default UpcomingMoviesPage;
