import React from "react";
import { useQuery } from "react-query";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Link } from "react-router-dom";
import { getMovieReviews } from "../../api/tmdb-api";
import { excerpt } from "../../util";

const MovieReviews = ({ movieId, movieTitle }) => {
  const { data: reviewsData, error, isLoading, isError } = useQuery(
    ["reviews", { id: movieId }],
    getMovieReviews
  );

  if (isLoading) return <p>Loading reviews...</p>;
  if (isError) return <p>{error.message}</p>;

  const reviews = reviewsData?.results || [];

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 550 }} aria-label="reviews table">
        <TableHead>
          <TableRow>
            <TableCell>Author</TableCell>
            <TableCell align="center">Excerpt</TableCell>
            <TableCell align="right">More</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {reviews.length > 0 ? (
            reviews.map((review) => (
              <TableRow key={review.id}>
                <TableCell>{review.author}</TableCell>
                <TableCell>{excerpt(review.content)}</TableCell>
                <TableCell>
                  <Link
                    to={`/reviews/${review.id}`}
                    state={{
                      review: review,
                      movie: { id: movieId, title: movieTitle }, // Pass movieTitle here
                    }}
                  >
                    Full Review
                  </Link>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={3} align="center">
                No reviews available for this movie.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default MovieReviews;
