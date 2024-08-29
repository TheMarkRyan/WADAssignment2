import React from "react";
import { useQuery } from "react-query";
import Spinner from '../spinner';
import { getGenres } from "../../api/tmdb-api";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import SearchIcon from "@mui/icons-material/Search";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Box from "@mui/material/Box";
import { useTheme } from "@mui/material/styles";

const formControl = {
  margin: 1,
  minWidth: 150,
};

export default function FilterMoviesCard(props) {
  const theme = useTheme(); // Access the theme (dark or light mode)
  const { data, error, isLoading, isError } = useQuery("genres", getGenres);

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <h1>{error.message}</h1>;
  }

  const genres = Array.isArray(data?.genres) ? data.genres : [];
  if (genres.length > 0 && genres[0].name !== "All") {
    genres.unshift({ id: "0", name: "All" });
  }

  const genreValue = props.genreFilter ?? "0";
  const actorValue = props.actorFilter ?? "";

  const handleTextChange = (e) => {
    handleChange(e, "name", e.target.value);
  };

  const handleActorChange = (e) => {
    handleChange(e, "actor", e.target.value);
  };

  const handleGenreChange = (e) => {
    handleChange(e, "genre", e.target.value);
  };

  const handleChange = (e, type, value) => {
    e.preventDefault();
    props.onUserInput(type, value);
  };

  return (
    <Card sx={{ width: "100%", backgroundColor: "#203354", color: "#ffffff", borderRadius: 1, marginBottom: 2 }}>
      <CardContent sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <SearchIcon fontSize="large" sx={{ marginRight: 2 }} />
          <Typography variant="h5" component="h1" sx={{ marginRight: 2 }}>
            Filter Movies
          </Typography>
        </Box>
        <Box sx={{ display: "flex", alignItems: "center", flexGrow: 1, justifyContent: "space-evenly" }}>
          <TextField
            sx={{
              ...formControl,
              flexBasis: "30%",
              "& .MuiInputLabel-root": {
                color: "#ffffff !important", // Force the label color to stay white
              },
              "& .MuiFilledInput-root": {
                backgroundColor: theme.palette.mode === "dark" ? "#333" : "#555", // Background color adjustment
                color: "#ffffff", // Ensure text inside the input stays white
              },
            }}
            id="filled-search-title"
            label="Search by Title"
            type="search"
            variant="filled"
            value={props.titleFilter ?? ""}
            onChange={handleTextChange}
          />
          <TextField
            sx={{
              ...formControl,
              flexBasis: "20%",
              "& .MuiInputLabel-root": {
                color: "#ffffff !important", // Force the label color to stay white
              },
              "& .MuiFilledInput-root": {
                backgroundColor: theme.palette.mode === "dark" ? "#333" : "#555", // Background color adjustment
                color: "#ffffff", // Ensure text inside the input stays white
              },
            }}
            id="filled-search-actor"
            label="Search by Actor"
            type="search"
            variant="filled"
            value={actorValue}
            onChange={handleActorChange}
          />
          <FormControl
            sx={{
              ...formControl,
              flexBasis: "20%",
              "& .MuiInputLabel-root": {
                color: "#ffffff !important", // Force the label color to stay white
              },
              "& .MuiSelect-root": {
                color: "#ffffff", // Ensure the dropdown text stays white
              },
            }}
          >
            <InputLabel id="genre-label">Genre</InputLabel>
            <Select labelId="genre-label" id="genre-select" value={genreValue} onChange={handleGenreChange}>
              {genres.map((genre) => (
                <MenuItem key={genre.id} value={genre.id}>
                  {genre.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
      </CardContent>
    </Card>
  );
}
