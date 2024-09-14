'use client'
import { Box, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import MovieCard from './movie-card';
import { getAllMovies } from '@/app/api-helpers/api-helpers.js';

const MoviePage = () => {
  // Define the Movie interface
  interface Movie {
    _id: number; // Use string to match MongoDB ObjectId type
    title: string;
    posterUrl: string;
    releaseDate: string;
  }
  

  // Initialize the state with an empty array of movies
  const [movies, setMovies] = useState<Movie[]>([]);

  useEffect(() => {
    getAllMovies()
      .then((data) => {
        console.log("API Response:", data); // Log the entire response
        if (data && data.movies) {
          setMovies(data.movies); // Safely check if 'movies' exists
        } else {
          console.error("Movies property is missing in the response");
        }
      })
      .catch((err) => {
        console.error("Error fetching movies:", err);
      });
  }, []);
  
  

  return (
    <Box margin={"auto"} marginTop={4} display='flex' gap={3} padding={5}>
      
      {/* The movie cards section */}
      
      <Box width={'100%'} margin="auto" display={'flex'} justifyContent="center" gap={3} padding={5} flexWrap='wrap'>
        {movies.map((movie: Movie) => (
          <MovieCard
            key={movie._id}
            id={movie._id}
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
