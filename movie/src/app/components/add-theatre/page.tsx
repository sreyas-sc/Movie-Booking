
// 'use client';
// import { useState, useEffect } from 'react';
// import { Box, Button, TextField, Typography, Grid, IconButton, Paper } from '@mui/material';
// import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
// import DeleteIcon from '@mui/icons-material/Delete';
// import { addTheater, getAllTheatres } from '@/app/api-helpers/api-helpers';

// type ShowTime = { time: string };
// type Theater = {
//   name: string;
//   location: string;
//   seatLayout: number[];
//   showtimes: ShowTime[];
// };

// const AddTheater = () => {
//   const [inputs, setInputs] = useState({
//     name: '',
//     location: '',
//     seats: 0,
//   });
//   const [seatLayout, setSeatLayout] = useState<number[]>([]);
//   const [showtimes, setShowtimes] = useState<ShowTime[]>([{ time: '' }]);
//   const [theaters, setTheaters] = useState<Theater[]>([]);
//   const [error, setError] = useState('');

//   // Fetch all theaters from the backend on component mount
  

//   // Handle input field changes
//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
//   };

//   // Add a new showtime field
//   const handleAddShowtime = () => {
//     setShowtimes((prev) => [...prev, { time: '' }]);
//   };

//   // Update a specific showtime field
//   const handleShowtimeChange = (index: number, value: string) => {
//     const updatedShowtimes = [...showtimes];
//     updatedShowtimes[index].time = value;
//     setShowtimes(updatedShowtimes);
//   };

//   // Remove a showtime field
//   const handleRemoveShowtime = (index: number) => {
//     setShowtimes((prev) => prev.filter((_, i) => i !== index));
//   };

//   // Handle form submission for adding a new theater
//   const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();

//     if (!inputs.name || !inputs.location || !inputs.seats) {
//       setError('Please fill all fields.');
//       return;
//     }

//     const theaterData = {
//       name: inputs.name,
//       location: inputs.location,
//       seatLayout: new Array(+inputs.seats).fill(1),
//       showtimes,
//     };

//     useEffect(() => {
//       console.log("the getAllTheatres function is being called here")
//       getAllTheatres()
//         .then((data) => console.log(data.movies)) // Ensure that data.movies matches the Movie interface
//         .catch(err => console.log(err));
//     }, []);
  

//     addTheater(theaterData)
//       .then((res) => {
//         console.log('Theatre added:', res);
//         setTheaters((prev) => [...prev, res]);
//         setError('');
//       })
//       .catch((err) => {
//         console.error('Error adding theater:', err);
//         setError('Error adding theater');
//       });
//   };

//   return (
//     <Box
//       component="form"
//       onSubmit={handleSubmit}
//       sx={{ width: '50%', margin: 'auto', padding: '20px', boxShadow: '10px 10px 20px #ccc' }}
//     >
//       <Typography variant="h5" textAlign="center" marginBottom={2}>
//         Add Theater
//       </Typography>
//       {error && <Typography color="error">{error}</Typography>}
      
//       {/* Input fields for theater details */}
//       <TextField
//         name="name"
//         label="Theater Name"
//         variant="standard"
//         fullWidth
//         margin="normal"
//         value={inputs.name}
//         onChange={handleChange}
//       />
//       <TextField
//         name="location"
//         label="Location"
//         variant="standard"
//         fullWidth
//         margin="normal"
//         value={inputs.location}
//         onChange={handleChange}
//       />
//       <TextField
//         name="seats"
//         label="Total Seats"
//         type="number"
//         variant="standard"
//         fullWidth
//         margin="normal"
//         value={inputs.seats}
//         onChange={handleChange}
//       />

//       {/* Section to add showtimes */}
//       <Typography variant="h6" marginTop={2}>
//         Showtimes
//       </Typography>
//       {showtimes.map((showtime, index) => (
//         <Grid container spacing={2} key={index} alignItems="center">
//           <Grid item xs={10}>
//             <TextField
//               fullWidth
//               label={`Showtime ${index + 1}`}
//               value={showtime.time}
//               onChange={(e) => handleShowtimeChange(index, e.target.value)}
//               variant="outlined"
//             />
//           </Grid>
//           <Grid item xs={2}>
//             <IconButton onClick={() => handleRemoveShowtime(index)} color="error">
//               <DeleteIcon />
//             </IconButton>
//           </Grid>
//         </Grid>
//       ))}
//       <Button
//         startIcon={<AddCircleOutlineIcon />}
//         onClick={handleAddShowtime}
//         variant="outlined"
//         color="primary"
//         sx={{ mt: 2 }}
//       >
//         Add Showtime
//       </Button>

//       {/* Submit button to add theater */}
//       <Button
//         type="submit"
//         variant="contained"
//         color="primary"
//         fullWidth
//         sx={{ mt: 3 }}
//       >
//         Add Theater
//       </Button>

//       {/* Display available theaters */}
//       <Box alignItems={"center"}>
//         <Typography variant="h6" mt={5}>
//           Available Theaters: 
//         </Typography>
//         {/* <Paper sx={{ padding: 2, marginTop: 2 }}>
//           {theaters.length > 0 ? (
//             theaters.map((theater, index) => (
//               <Box key={index} sx={{ marginBottom: 2 }}>
//                 <Typography variant="h6">{theater.name}</Typography>
//                 <Typography variant="body2">Location: {theater.location}</Typography>
//                 <Typography variant="body2">Total Seats: {theater.seatLayout.length}</Typography>
//                 <Typography variant="body2">Showtimes: {theater.showtimes.map(showtime => showtime.time).join(', ')}</Typography>
//               </Box>
//             ))
//           ) : (
//             <Typography>No theaters available</Typography>
//           )}
//         </Paper> */}
//       </Box>
//     </Box>
//   );
// };

// export default AddTheater;
'use client'
import { useState, useEffect, SetStateAction } from 'react';
import { Box, Button, TextField, Typography, Grid, IconButton, Paper, MenuItem, Select, FormControl, InputLabel } from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import DeleteIcon from '@mui/icons-material/Delete';
import { addTheater, getAllTheatres } from '@/app/api-helpers/api-helpers';
import { useRouter } from 'next/navigation';

type ShowTime = { time: string };
type Theater = {
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
  const router = useRouter();

  // Fetch all theaters from the backend on component mount
  useEffect(() => {
    console.log("the getAllTheatres function is being called here");
    getAllTheatres()
      .then((data) => {
        setTheaters(data);
        setFilteredTheaters(data);
      })
      .catch(err => console.log(err));
  }, []);

  // Fetch all movies from the backend
  // useEffect(() => {
  //   getMovies()
  //     .then((data: SetStateAction<never[]>) => setMovies(data))
  //     .catch((err: any) => console.log(err));
  // }, []);

  // Handle input field changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // Add a new showtime field
  const handleAddShowtime = () => {
    setShowtimes((prev) => [...prev, { time: '' }]);
  };

  // Update a specific showtime field
  const handleShowtimeChange = (index: number, value: string) => {
    const updatedShowtimes = [...showtimes];
    updatedShowtimes[index].time = value;
    setShowtimes(updatedShowtimes);
  };

  // Remove a showtime field
  const handleRemoveShowtime = (index: number) => {
    setShowtimes((prev) => prev.filter((_, i) => i !== index));
  };

  // Handle form submission for adding a new theater
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
        console.log('Theatre added:', res);
        setTheaters((prev) => [...prev, res]);
        setFilteredTheaters((prev) => [...prev, res]);
        setError('');
      })
      .catch((err) => {
        console.error('Error adding theater:', err);
        setError('Error adding theater');
      });
  };

  // Handle search input change
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // Filter theaters based on search input
  useEffect(() => {
    const filtered = theaters.filter(theater =>
      theater.name.toLowerCase().includes(search.name.toLowerCase()) &&
      theater.location.toLowerCase().includes(search.location.toLowerCase())
    );
    setFilteredTheaters(filtered);
  }, [search, theaters]);

  // Navigate to the add shows form
  const handleAddShows = (theater: Theater) => {
    // router.push({
    //   pathname: '/add-shows',
    //   query: { theater: JSON.stringify(theater) },
    // });
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
      
      {/* Input fields for theater details */}
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

      {/* Section to add showtimes */}
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

      {/* Submit button to add theater */}
      <Button
        type="submit"
        variant="contained"
        color="primary"
        fullWidth
        sx={{ mt: 3 }}
      >
        Add Theater
      </Button>

      {/* Filter theaters */}
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

      {/* Display available theaters */}
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
                <Typography variant="body2">Showtimes: {theater.showtimes.map(showtime => showtime.time).join(', ')}</Typography>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => handleAddShows(theater)}
                >
                  Add Shows
                </Button>
              </Box>
            ))
          ) : (
            <Typography>No theaters available</Typography>
          )}
        </Paper>
      </Box>
    </Box>
  );
};

export default AddTheater;
