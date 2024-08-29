import React, { useContext } from "react";
import { MoviesContext } from "../../contexts/moviesContext";
import IconButton from "@mui/material/IconButton";
import FavoriteIcon from "@mui/icons-material/Favorite";

const AddToFavoritesIcon = ({ movie }) => {
  const context = useContext(MoviesContext);

  const handleAddToFavorites = (e) => {
    e.preventDefault();
    context.addToFavorites(movie);
  };

  // Determine if the movie is already in the favorites list
  const isFavorited = context.favorites.includes(movie.id);

  return (
    <IconButton aria-label="add to favorites" onClick={handleAddToFavorites}>
      <FavoriteIcon color={isFavorited ? "error" : "primary"} fontSize="large" />
    </IconButton>
  );
};

export default AddToFavoritesIcon;
