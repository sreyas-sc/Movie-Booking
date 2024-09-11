import { Card, CardActions, CardContent, CardMedia, Typography, Button } from '@mui/material';
import React from 'react';

interface MovieCardProps {
  title: string;
  description: string;
  releaseDate: string;
  posterUrl: string;
  duration: string;
  id: number;
}

const MovieCard: React.FC<MovieCardProps> = ({ title, description, releaseDate, posterUrl, duration, id }) => {
  return (
    <Card 
      sx={{ 
        width: 300, 
        height: 450, 
        borderRadius: 5, 
        display: 'flex', 
        flexDirection: 'column',
        justifyContent: 'space-between', // Ensure the content and button are spaced
        ":hover": {
          boxShadow: "10px 10px 20px #ccc"
        }
      }}
    >
      <CardMedia
        component="img"
        height={200}  // Adjust this value to control the image size
        image={posterUrl}
        alt={title}
      />
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography gutterBottom variant='h5' component="div">
          {title}
        </Typography>
        <Typography variant='body2' color='text.secondary'>
          {description}
        </Typography>
        <Typography variant='body2' color='text.secondary'>
          Release Date: {releaseDate}
        </Typography>
        <Typography variant='body2' color='text.secondary'>
          Duration: {duration}
        </Typography>
      </CardContent>
      <CardActions sx={{ justifyContent: 'center', paddingBottom: 2 }}>
        <Button
          sx={{
            size: "small",
            color: "rgb(255, 255, 255)",
            borderRadius: "8px",
            backgroundColor: "rgba(248, 68, 100)",
            border: "1px solid rgb(245, 255, 255)",
            '&:hover': {
              backgroundColor: "rgba(248, 68, 100)",
            }
          }}
        >
          Book Tickets
        </Button>
      </CardActions>
    </Card>
  );
};

export default MovieCard;
