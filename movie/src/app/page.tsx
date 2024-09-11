"use client";

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, Typography, Grid, Card, CardMedia, CardContent, Button } from '@mui/material';
import MovieCard from './components/movies/movie-card';
import Link from 'next/link';
import { getAllMovies } from './api-helpers/api-helpers.js';

interface UpcomingMovie {
  id: number;
  overview:  string;
  vote_average:  number;
  title: string;
  poster_path: string;
  original_language: string;
  release_date: string;
  duration: string; // Adjust this if your API provides duration
}

interface LatestReleaseMovie {
  id: number;
  title: string;
  posterUrl: string;
  releaseDate: string;
  duration: string; // Adjust this if your API provides duration
}

interface UpcomingMovieResponse {
  results: UpcomingMovie[];
}

interface Movie {
  id: number;
  title: string;
  posterUrl: string;
  releaseDate: string;
}

export default function Homepage() {
  const [upcomingMovies, setUpcomingMovies] = useState<UpcomingMovie[]>([]);
  const [latestReleases, setLatestReleases] = useState<LatestReleaseMovie[]>([]);
  const [movies, setMovies] = useState<Movie[]>([]); // Explicitly set the type here

  useEffect(() => {
    getAllMovies()
      .then((data) => setMovies(data.movies)) // Ensure that data.movies matches the Movie interface
      .catch(err => console.log(err));
  }, []);

  useEffect(() => {
    axios
      .get<UpcomingMovieResponse>(
        "https://api.themoviedb.org/3/movie/upcoming?api_key=446d69b8e014e2930a30c318caf3cfd1"
      )
      .then((res) => {
        const upcoming: UpcomingMovie[] = res.data.results;
        setUpcomingMovies(upcoming);
        console.log(res.data.results);
        
      })
      .catch((error) => {
        console.error("Error fetching upcoming movies:", error);
      });
  }, []);

  return (
    <Box width={'100%'} height={'100%'} margin="auto" marginTop={2}>
      <Box margin="auto" width={'90%'} height={'20%'} padding={0}>
        <img
          src='https://assets-in.bmscdn.com/iedb/movies/images/mobile/listing/xxlarge/deadpool-and-wolverine-et00341295-1718018322.jpg'
          alt='Unable to load image'
          width={'100%'}
          height={'40%'}
        />
      </Box>

      <Box padding={5} margin='auto'>
        <Typography variant='h4' textAlign={"center"}>
          Latest Releases
        </Typography>
      </Box>

      <Box
        display='flex'
        justifyContent='center'
        gap={3}
        padding={5}
        flexWrap='wrap'>
        
        {movies && movies.slice(0,4).map((movie) => (
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

      <Box display="flex" justifyContent="center" padding={5}>
        <Link href="/components/movies" passHref legacyBehavior>
          <Button
            variant="outlined"
            sx={{
              whiteSpace: 'nowrap',
              paddingLeft: 10,
              paddingRight: 10
            }}
          >
            View All Movies
          </Button>
        </Link>
      </Box>

      <Box padding={5} margin='auto'>
        <Typography variant='h4' textAlign={"center"}>
          Trending Movies
        </Typography>
      </Box>

      <Grid container spacing={4} justifyContent="center" paddingX={5} flexWrap="wrap">
  {upcomingMovies.map((movie) => (
    <Grid item xs={12} sm={6} md={4} key={movie.id}>
      <Card sx={{ maxWidth: 345, cursor: 'pointer' }} onClick={() => console.log(movie.id)}>
        <CardMedia
          component="img"
          height="300"
          image={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
          alt={movie.title}
        />
        <CardContent>
          <Typography variant="h6">
            {movie.title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Language: {movie.original_language}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Release Date: {new Date(movie.release_date).toLocaleDateString()}
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ marginTop: 1 }}>
            Rating: {movie.vote_average}/10
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ marginTop: 1 }}>
            {movie.overview.length > 100 ? `${movie.overview.substring(0, 100)}...` : movie.overview}
          </Typography>
        </CardContent>
      </Card>
    </Grid>
  ))}
</Grid>

    </Box>
  );
}
