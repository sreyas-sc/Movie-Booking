
'use client';
import React, { useEffect, useState } from 'react';
import { Box, Typography, Button, Grid } from '@mui/material';
import { useRouter } from 'next/navigation';

const SeatSelection: React.FC = () => {
  const [seatLayout, setSeatLayout] = useState<string[][]>([]);
  const [selectedSeats, setSelectedSeats] = useState<Set<string>>(new Set());
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedTheater, setSelectedTheater] = useState<string | null>(null);
  const [movieName, setMovieName] = useState<string | null>(null);
  const [movieId, setMovieId] = useState<string | null>(null);


  const [selectedTimes, setSelectedTimes] = useState<{ [key: string]: string | null }>({});
  const router = useRouter();

  useEffect(() => {
    const movieNameFromStorage = localStorage.getItem('selectedMovie');
    const movieId = localStorage.getItem('selectedMovieId');
    const savedDate = localStorage.getItem('selectedDate');
    const savedTheater = localStorage.getItem('selectedTheater');
    const savedTimes = localStorage.getItem('selectedTimes');
    const savedSeatLayout = localStorage.getItem('seatLayout');

    if (movieNameFromStorage) setMovieName(movieNameFromStorage);
    if (movieId) setMovieId(movieId);
    if (savedDate) setSelectedDate(savedDate);
    if (savedTheater) setSelectedTheater(savedTheater);
    if (savedTimes) setSelectedTimes(JSON.parse(savedTimes));
    if (savedSeatLayout) {
      const seatNumbers = JSON.parse(savedSeatLayout);
      const rows = 6; // Adjust this number based on your layout
      setSeatLayout(generateSeatLayout(seatNumbers, rows));
    }
  }, []);

  const handleSeatClick = (seatLabel: string) => {
    setSelectedSeats(prev => {
      const newSelection = new Set(prev);
      if (newSelection.has(seatLabel)) {
        newSelection.delete(seatLabel);
      } else if (newSelection.size < 10) {
        newSelection.add(seatLabel);
      }
      return newSelection;
    });
  };

  const handleBookSeats = () => {
    console.log('Selected Seats:', Array.from(selectedSeats));

    // Proceed with booking logic here

    router.push('/confirmation'); // Redirect to confirmation page
  };

  // Utility function to generate seat labels dynamically
  const generateSeatLayout = (seatNumbers: number[], rows: number): string[][] => {
    const seatLabels: string[] = [];
    let index = 0;
    
    // Generate seat labels for each seat number
    for (let i = 0; i < seatNumbers.length; i++) {
      if (seatNumbers[i] === 1) {
        const rowLabel = String.fromCharCode(65 + Math.floor(index / rows)); // Convert index to row label
        const seatNumber = (index % rows) + 1; // Convert index to seat number
        seatLabels.push(`${rowLabel}${seatNumber}`);
        index++;
      }
    }
    
    // Create 2D array from seat labels
    const result: string[][] = [];
    for (let i = 0; i < rows; i++) {
      const rowLength = Math.min(seatLabels.length - i * rows, rows);
      result.push(seatLabels.slice(i * rows, i * rows + rowLength));
    }
    
    return result;
  };

  // Calculate total cost
  const seatCost = 120;
  const totalCost = selectedSeats.size * seatCost;

  const formatDate = (date: string | null) => {
    if (!date) return '';
    const d = new Date(date);
    return d.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  // Extract theater name and place
  const getTheaterDetails = (theater: string | null) => {
    if (!theater) return { name: '', place: '' };
    const parts = theater.split('-');
    const name = parts[1] || '';
    const place = parts[2] || '';
    return { name, place };
  };

  const { name: theaterName, place: theaterPlace } = getTheaterDetails(selectedTheater);

  return (
    <div>
      <Typography variant="h4" textAlign={'center'} padding={3}>
        Select Seats
      </Typography>

      <Box display={'flex'} flexDirection={'column'} alignItems={'center'}>
        <Typography variant="h6">
        Movie: {movieName}
        </Typography>
        <Typography variant="h6">
          Date: {formatDate(selectedDate)}
        </Typography>
        <Typography variant="h6">
          Theater: {theaterName} {theaterPlace && `(${theaterPlace})`}
        </Typography>
        <Typography variant="h6">
          Time: {Object.values(selectedTimes).join(', ')}
        </Typography>

        <Box
          width="70%"
          height="50px"
          mt={10}
          mb={10}
          sx={{
            alignContent: "center",
            textAlign: "center",
            background: "grey",
            borderRadius: "0 0 50px 50px", // Curve the bottom corners
            borderTopLeftRadius: 0,
            borderTopRightRadius: 0,
          }}
        >
          <Typography sx={{ color: "white", fontWeight: 700 }}>All eyes this way</Typography>
        </Box>

        {/* Render seat rows */}
        <Box marginTop={3} width="100%" maxWidth="1200px" mx="auto">
          {seatLayout.map((row, rowIndex) => (
            <Grid container spacing={1} key={rowIndex} justifyContent="center" marginBottom={1}>
              {row.map(seat => (
                <Grid item key={seat}>
                  <Button
                    variant={selectedSeats.has(seat) ? 'contained' : 'outlined'}
                    onClick={() => handleSeatClick(seat)}
                    sx={{
                      minWidth: '40px',
                      minHeight: '40px',
                      backgroundColor: selectedSeats.has(seat) ? 'rgba(248, 68, 100)' : 'transparent',
                      color: selectedSeats.has(seat) ? 'white' : 'rgba(248, 68, 100)',
                      borderColor: 'rgba(248, 68, 100)',
                      '&:hover': {
                        backgroundColor: selectedSeats.has(seat) ? 'darkred' : 'rgba(248, 68, 100, 0.1)',
                      },
                      margin: '2px',
                    }}
                  >
                    {seat}
                  </Button>
                </Grid>
              ))}
            </Grid>
          ))}
        </Box>

        {/* Display selected seats and total cost */}
        <Box marginTop={2} textAlign={'center'}>
          <Typography variant="h6">
            Selected Seats: {Array.from(selectedSeats).join(', ')}
          </Typography>
          <Typography variant="h6" marginTop={1}>
            Total Cost: ₹{totalCost}
          </Typography>
        </Box>

        <Box display={'flex'} justifyContent={'center'} padding={2}>
          <Button
            variant="contained"
            onClick={handleBookSeats}
            sx={{ backgroundColor: 'rgba(248, 68, 100)' }}
          >
            Book Selected Seats
          </Button>
        </Box>
      </Box>
    </div>
  );
};

export default SeatSelection;
