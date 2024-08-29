import { useEffect, useState } from "react";
import { getMovie } from '../api/tmdb-api';

const useMovie = (id) => {
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    getMovie({ queryKey: ["movie", { id }] }) // Pass the correct structure
      .then((movie) => setMovie(movie));
  }, [id]);

  return [movie, setMovie];
};

export default useMovie;
