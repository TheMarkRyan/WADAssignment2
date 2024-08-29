import React, { useState } from "react";
import { useQuery } from "react-query";
import {
  getMoviesByGenre,
  getMovies,
  searchActor,
  getMoviesByActorId,
  getMoviesByActor
} from "../api/tmdb-api";
import Spinner from "../components/spinner";
import PageTemplate from "../components/templateMovieListPage";
import FilterMoviesCard from "../components/filterMoviesCard";
import AddToFavoritesIcon from "../components/cardIcons/addToFavorites";

const HomePage = () => {
  const [genreId, setGenreId] = useState("0");
  const [sortBy, setSortBy] = useState("popularity.desc");
  const [actorName, setActorName] = useState(""); // New state for actor search

  const { data, error, isLoading, isError } = useQuery(
    ["discover", genreId, sortBy, actorName],
    () => {
      if (actorName) {
        return getMoviesByActor(actorName);
      } else if (genreId !== "0") {
        return getMoviesByGenre(genreId, sortBy);
      } else {
        return getMovies(sortBy);
      }
    }
  );

  if (isLoading) return <Spinner />;
  if (isError) return <h1>{error.message}</h1>;

  // Ensure movies is always an array
  const movies = Array.isArray(data?.results) ? data.results : [];

  const handleFilterChange = (type, value) => {
    if (type === "genre") setGenreId(value);
    if (type === "sort") setSortBy(value);
    if (type === "actor") setActorName(value);
  };

  return (
    <PageTemplate
      title="Discover Movies"
      movies={movies}
      action={(movie) => <AddToFavoritesIcon movie={movie} />}
    >
      <FilterMoviesCard
        onUserInput={handleFilterChange}
        titleFilter=""
        genreFilter={genreId}
        sortBy={sortBy}
        actorFilter={actorName}
      />
    </PageTemplate>
  );
};


export default HomePage;
