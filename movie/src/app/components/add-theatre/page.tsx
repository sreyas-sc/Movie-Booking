'use client';
import { useState, useEffect, SetStateAction } from 'react';
import { Box, Button, TextField, Typography, Grid, IconButton, Paper } from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import DeleteIcon from '@mui/icons-material/Delete';
import { addTheater, getAllMovies, getAllTheatres } from '@/app/api-helpers/api-helpers';
import { useRouter } from 'next/navigation';

type ShowTime = { time: string };

type Theater = {
  _id: string;
  name: string;
  location: string;
  seatLayout: number[];
  showtimes: ShowTime[];
};

const AddTheater = () => {
  const [inputs, setInputs] = useState({
    name: '',
    location: '',
    seats: 0,
  });
  const [seatLayout, setSeatLayout] = useState<number[]>([]);
  const [showtimes, setShowtimes] = useState<ShowTime[]>([{ time: '' }]);
  const [theaters, setTheaters] = useState<Theater[]>([]);
  const [filteredTheaters, setFilteredTheaters] = useState<Theater[]>([]);
  const [error, setError] = useState('');
  const [search, setSearch] = useState({ name: '', location: '' });
  const [movies, setMovies] = useState([]);
  const router = useRouter(); // This should work if AddTheater is in a page

  useEffect(() => {
    getAllTheatres()
      .then((data) => {
        setTheaters(data);
        setFilteredTheaters(data);
      })
      .catch(err => console.log(err));
  }, []);

  useEffect(() => {
    getAllMovies()
      .then((data: SetStateAction<never[]>) => setMovies(data))
      .catch((err: any) => console.log(err));
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleAddShowtime = () => {
    setShowtimes((prev) => [...prev, { time: '' }]);
  };

  const handleShowtimeChange = (index: number, value: string) => {
    const updatedShowtimes = [...showtimes];
    updatedShowtimes[index].time = value;
    setShowtimes(updatedShowtimes);
  };

  const handleRemoveShowtime = (index: number) => {
    setShowtimes((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!inputs.name || !inputs.location || !inputs.seats) {
      setError('Please fill all fields.');
      return;
    }

    const theaterData = {
      name: inputs.name,
      location: inputs.location,
      seatLayout: new Array(+inputs.seats).fill(1),
      showtimes,
    };

    addTheater(theaterData)
      .then((res) => {
        setTheaters((prev) => [...prev, res]);
        setFilteredTheaters((prev) => [...prev, res]);
        setError('');
      })
      .catch((err) => {
        console.error('Error adding theater:', err);
        setError('Error adding theater');
      });
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  useEffect(() => {
    const filtered = theaters.filter(theater =>
      theater.name.toLowerCase().includes(search.name.toLowerCase()) &&
      theater.location.toLowerCase().includes(search.location.toLowerCase())
    );
    setFilteredTheaters(filtered);
  }, [search, theaters]);

  // const handleAddShows = (theater: Theater) => {
  //   // Save theater data to localStorage
  //   localStorage.setItem('selectedTheater', JSON.stringify(theater));   
  //   // Redirect to the add-shows page
  //   router.push('/components/add-shows');
  // };
  const handleAddShows = (theater: Theater) => {
    console.log("the theatre id is:",theater._id)
    // Save theater data, including the ID, to localStorage or sessionStorage
    localStorage.setItem('selectedTheater', JSON.stringify({
      _id: theater._id, 
      name: theater.name, 
      location: theater.location, 
      seatLayout: theater.seatLayout, 
      showtimes: theater.showtimes,
    }));   
    
    // Redirect to the add-shows page
    router.push('/components/add-shows');
  };
  
  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{ width: '50%', margin: 'auto', padding: '20px', boxShadow: '10px 10px 20px #ccc' }}
    >
      <Typography variant="h5" textAlign="center" marginBottom={2}>
        Add Theater
      </Typography>
      {error && <Typography color="error">{error}</Typography>}
      
      <TextField
        name="name"
        label="Theater Name"
        variant="standard"
        fullWidth
        margin="normal"
        value={inputs.name}
        onChange={handleChange}
      />
      <TextField
        name="location"
        label="Location"
        variant="standard"
        fullWidth
        margin="normal"
        value={inputs.location}
        onChange={handleChange}
      />
      <TextField
        name="seats"
        label="Total Seats"
        type="number"
        variant="standard"
        fullWidth
        margin="normal"
        value={inputs.seats}
        onChange={handleChange}
      />

      <Typography variant="h6" marginTop={2}>
        Showtimes
      </Typography>
      {showtimes.map((showtime, index) => (
        <Grid container spacing={2} key={index} alignItems="center">
          <Grid item xs={10}>
            <TextField
              fullWidth
              label={`Showtime ${index + 1}`}
              value={showtime.time}
              onChange={(e) => handleShowtimeChange(index, e.target.value)}
              variant="outlined"
            />
          </Grid>
          <Grid item xs={2}>
            <IconButton onClick={() => handleRemoveShowtime(index)} color="error">
              <DeleteIcon />
            </IconButton>
          </Grid>
        </Grid>
      ))}
      <Button
        startIcon={<AddCircleOutlineIcon />}
        onClick={handleAddShowtime}
        variant="outlined"
        color="primary"
        sx={{ mt: 2 }}
      >
        Add Showtime
      </Button>

      <Button
        type="submit"
        variant="contained"
        color="primary"
        fullWidth
        sx={{ mt: 3 }}
      >
        Add Theater
      </Button>

      <Box mt={4}>
        <Typography variant="h6">Filter Theaters</Typography>
        <TextField
          name="name"
          label="Name"
          variant="outlined"
          fullWidth
          margin="normal"
          value={search.name}
          onChange={handleSearchChange}
        />
        <TextField
          name="location"
          label="Location"
          variant="outlined"
          fullWidth
          margin="normal"
          value={search.location}
          onChange={handleSearchChange}
        />
      </Box>

      <Box alignItems={"center"} mt={4}>
        <Typography variant="h6">
          Available Theaters
        </Typography>
        <Paper sx={{ padding: 2, marginTop: 2 }}>
          {filteredTheaters.length > 0 ? (
            filteredTheaters.map((theater, index) => (
              <Box key={index} sx={{ marginBottom: 2 }}>
                <Typography variant="h6">{theater.name}</Typography>
                <Typography variant="body2">Location: {theater.location}</Typography>
                <Typography variant="body2">Total Seats: {theater.seatLayout.length}</Typography>
                <Typography variant="body2">Showtimes: {theater.showtimes.map(st => st.time).join(', ')}</Typography>
                <Button variant="contained" color="primary" onClick={() => handleAddShows(theater)}>
                  Add Shows
                </Button>
              </Box>
            ))
          ) : (
            <Typography>No theaters found</Typography>
          )}
        </Paper>
      </Box>
    </Box>
  );
};

export default AddTheater;
