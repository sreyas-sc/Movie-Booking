'use client'
import { Box, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import MovieCard from './movie-card';
import { getAllMovies } from '@/app/api-helpers/api-helpers.js';

const MoviePage = () => {
  // Define the Movie interface
  interface Movie {
    id: number;
    title: string;
    posterUrl: string;
    releaseDate: string;
  }

  // Initialize the state with an empty array of movies
  const [movies, setMovies] = useState<Movie[]>([]);

  useEffect(() => {
    getAllMovies()
      .then((data) => setMovies(data.movies)) // Ensure this response returns 'movies'
      .catch((err) => console.log(err));
  }, []);

  return (
    <Box margin={"auto"} marginTop={4} display='flex' gap={3} padding={5}>
      {/* <Typography 
        variant='h4' 
        padding={2} 
        width="100%" 
        bgcolor={"#900C3F"} 
        color={"#FFFFFF"}
        textAlign="center">
          Movies
      </Typography> */}

      {/* The movie cards section */}
      <Box width={'100%'} margin="auto" display={'flex'} justifyContent="center" gap={3} padding={5} flexWrap='wrap'>
        {movies.map((movie: Movie) => (
          <MovieCard
            key={movie.id}
            id={movie.id}
            title={movie.title}
            posterUrl={movie.posterUrl}
            releaseDate={movie.releaseDate}
            description={`Description for ${movie.title}`} // Placeholder description
            duration="N/A" // Adjust this if you have duration data
          />
        ))}
      </Box>
    </Box>
  );
}

export default MoviePage;
