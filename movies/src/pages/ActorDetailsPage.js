import React from "react";
import { useParams, Link } from "react-router-dom";
import { useQuery } from "react-query";
import { getActorDetails, getMoviesByActorId } from "../api/tmdb-api";
import Spinner from "../components/spinner";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

const ActorDetailsPage = () => {
  const { id } = useParams(); // Gets the actor ID from the URL
  const { data: actorData, error, isLoading, isError } = useQuery(["actorDetails", { id }], () =>
    getActorDetails(id)
  );
  const { data: moviesData, isLoading: moviesLoading } = useQuery(
    ["actorMovies", { id }],
    () => getMoviesByActorId(id)
  );

  if (isLoading || moviesLoading) return <Spinner />;
  if (isError) return <h1>{error.message}</h1>;

  return (
    <Box sx={{ padding: "20px" }}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <Card>
            <CardMedia
              component="img"
              height="400"
              image={`https://image.tmdb.org/t/p/w500/${actorData.profile_path}`}
              alt={actorData.name}
            />
            <CardContent>
              <Typography variant="h5">{actorData.name}</Typography>
              <Typography variant="body2" sx={{ marginTop: "10px" }}>
                {actorData.biography || "Biography not available."}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography variant="h6">Filmography</Typography>
          <Grid container spacing={2} sx={{ marginTop: "10px" }}>
            {moviesData.map((movie) => (
              <Grid key={movie.id} item xs={12} sm={6} md={4}>
                <Card>
                  <CardMedia
                    component="img"
                    height="250"
                    image={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                    alt={movie.title}
                  />
                  <CardContent>
                    <Typography variant="h6">{movie.title}</Typography>
                    <Button
                      component={Link}
                      to={`/movies/${movie.id}`} // Link to the movie details page
                      variant="contained"
                      color="primary"
                      sx={{ marginTop: "10px" }}
                    >
                      View Movie
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ActorDetailsPage;
