import React from "react";
import { Link } from "react-router-dom";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import CardHeader from "@mui/material/CardHeader";
import Typography from "@mui/material/Typography";
import FavoriteIcon from "@mui/icons-material/Favorite";
import IconButton from "@mui/material/IconButton";
import Grid from "@mui/material/Grid";
import Avatar from "@mui/material/Avatar";
import img from "../../images/film-poster-placeholder.png";
import WriteReviewIcon from "../cardIcons/writeReview";

const MovieCard = ({ movie, action }) => {
  return (
    <Card sx={{ maxWidth: 500 }}>
      <CardHeader
        avatar={
          movie.favorite ? (
            <Avatar sx={{ backgroundColor: "red" }}>
              <FavoriteIcon />
            </Avatar>
          ) : null
        }
        title={
          <Typography variant="h5" component="p">
            {movie.title}
          </Typography>
        }
      />
      <CardMedia
        sx={{ height: 250 }}
        image={
          movie.poster_path
            ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}`
            : img
        }
      />
      <CardContent>
        <Grid container>
          <Grid item xs={6}>
            <Typography variant="body2" component="p">
              Release Date: {movie.release_date}
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="body2" component="p">
              Rating: {movie.vote_average}
            </Typography>
          </Grid>
        </Grid>
      </CardContent>
      <CardActions disableSpacing>
        {action && action(movie)} 
        <WriteReviewIcon movie={movie} />
        <Link to={`/movies/${movie.id}`}>
          <IconButton>
            <Typography variant="button">More Info</Typography>
          </IconButton>
        </Link>
      </CardActions>
    </Card>
  );
};

export default MovieCard;

