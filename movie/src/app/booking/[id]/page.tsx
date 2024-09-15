'use client';

import { getMovieDetails } from '@/app/api-helpers/api-helpers.js';
import { Box, FormControlLabel, TextField, Typography } from '@mui/material';
import { useParams } from 'next/navigation';
import React, { Fragment, useEffect, useState } from 'react';
import { FormLabel } from 'react-bootstrap';

interface Movie {
  releaseDate: string | number | Date;
  title: string;
  description?: string;
  posterUrl?: string;
  // Add other properties as needed
}

const Booking: React.FC = () => {
  const [movie, setMovie] = useState<Movie | null>(null);
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      getMovieDetails(id)
        .then((res) => {
          console.log('Response from getMovieDetails:', res);
          if (res && res.movie) {
            setMovie(res.movie);
          } else {
            console.error('Movie not found or invalid response:', res);
          }
        })
        .catch(err => console.error('Error fetching movie details:', err));
    }
  }, [id]);

  return (
    <div>

      {movie ? (
        <Fragment>
          <Typography 
            padding={3} 
            fontFamily="fantasy" 
            variant='h4' 
            textAlign={"center"}>
            Book tickets for the movie: {movie.title}
          </Typography>
            <Box 
              display={'flex'}
              justifyContent={'center'}
            >
              <Box 
                display={'flex'} 
                justifyContent={'column'} 
                flexDirection={'column'} 
                pt={3} width='50%' 
                marginRight={'auto'}>
                  {/* The poster image of moviee */}
                  <img 
                    width='80%' 
                    height={"300px"} 
                    src={movie.posterUrl} 
                    alt={movie.title} />
                  <Box 
                    width={"80%"}
                    marginTop={3}
                    padding={2}>
                      {/* Movie description */}
                      <Typography paddingTop={2}>
                        {movie.description}
                      </Typography>  
                      {/* Movie Cast */}
                      <Typography paddingTop={1} fontWeight={'bold'}>
                        Cast:
                        {/* {movie.actors.map((actor)=>actor + ", ")} */}
                      </Typography>  
                      <Typography fontWeight={'bold'} mt={1}>
                          Release Date: { new Date (movie.releaseDate).toLocaleDateString() }

                      </Typography>
                  </Box>
              </Box>
              {/* Box for the right container */}
              <Box width={"50%"} paddingTop={3}>
                <form>
                  <Box padding={5} margin={"auto"} display={'flex'} flexDirection={"column"}>
                   <TextField name='seatNumber' type='number' margin='normal' variant='standard'>

                   </TextField>
                    
                   <TextField name='date' type='date' margin='normal' variant='standard'>
                    
                   </TextField>
                  </Box>
                </form>
              </Box>

            </Box>
        </Fragment>
      ) : (
        <Typography padding={3} fontFamily="fantasy" variant='h6' textAlign={"center"}>
          Loading movie details...
        </Typography>
      )}
    </div>
  );
};

export default Booking;
