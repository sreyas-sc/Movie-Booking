// 'use client'
// import { useState } from 'react';
// import { addMovie } from '@/app/api-helpers/api-helpers.js';
// import { Checkbox } from '@mui/material'; // Use Checkbox from @mui/material
// import { Box, Button, TextField, Typography } from '@mui/material';
// import React from 'react';

// const AddMovie = () => {
//   const [inputs, setInputs] = useState({ title: '', featured: false });
//   const [actor, setActor] = useState('');
//   const [actors, setActors] = useState<string[]>([]);
//   const [error, setError] = useState('');

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
//   };

//   const handleActorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setActor(e.target.value);
//   };

//   const addActor = () => {
//     if (actor.trim()) {
//       setActors((prev) => [...prev, actor]);
//       setActor('');
//     }
//   };

//   const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setInputs((prev) => ({ ...prev, featured: e.target.checked })); // Set featured based on checkbox
//   };

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!inputs.title || actors.length === 0) {
//       setError('Please fill in all fields and add at least one actor.');
//       return;
//     }
//     addMovie({ ...inputs, actors })
//       .then((res) => console.log('Movie added:', res))
//       .catch((err) => console.error('Error adding movie:', err));
//   };

//   return (
//     <div>
//       <form onSubmit={handleSubmit}>
//         <Box
//           width={"50%"}
//           padding={'20px'}
//           margin={"auto"}
//           display={"flex"}
//           flexDirection={'column'}
//           boxShadow={'10px 10px 20px #ccc'}
//         >
//           <Typography textAlign={"center"} variant='h5' fontFamily={'Verdana'}>
//             Add Movie   
//           </Typography>
//           {error && <Typography color="red">{error}</Typography>}
          
//           <label>Movie Name</label>
//           <TextField
//             name='title'
//             variant='standard'
//             margin='normal'
//             value={inputs.title}
//             onChange={handleChange}
//           />

//           <label>Cast</label>
//           <Box display={'flex'} alignItems={'center'}>
//             <TextField
//               name='actor'
//               variant='standard'
//               margin='normal'
//               value={actor}
//               onChange={handleActorChange}
//             />
//             <Button onClick={addActor} sx={{ marginLeft: '10px' }}>Add</Button>
//           </Box>
//           <Box>
//             {actors.length > 0 && (
//               <Typography variant="body1">Actors: {actors.join(', ')}</Typography>
//             )}
//           </Box>

//           <label>Featured</label>
//           <Checkbox
//             checked={inputs.featured}
//             onChange={handleCheckboxChange} // Handle checkbox change correctly
//           />

//           <Button type='submit' variant='contained' sx={{ width: "30%", bgcolor: "#2b2d42", marginTop: '10px' }}>
//             Add new movie
//           </Button>
//         </Box>
//       </form>
//     </div>
//   );
// };

// export default AddMovie;

'use client';
import { useState } from 'react';
import { addMovie } from '@/app/api-helpers/api-helpers.js';
import { Checkbox, Box, Button, TextField, Typography } from '@mui/material';
import React from 'react';

const AddMovie = () => {
  const [inputs, setInputs] = useState({
    title: '',
    description: '',
    releaseDate: '',
    posterUrl: '',
    bannerUrl: '',
    genre: '',
    duration: '',
    featured: false,
    rating: ''
  });
  const [actor, setActor] = useState('');
  const [actors, setActors] = useState<string[]>([]);
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleActorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setActor(e.target.value);
  };

  const addActor = () => {
    if (actor.trim()) {
      setActors((prev) => [...prev, actor]);
      setActor('');
    }
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputs((prev) => ({ ...prev, featured: e.target.checked }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputs.title || actors.length === 0) {
      setError('Please fill in all fields and add at least one actor.');
      return;
    }
    addMovie({ ...inputs, actors })
      .then((res) => console.log('Movie added:', res))
      .catch((err) => console.error('Error adding movie:', err));
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <Box
          width={"50%"}
          padding={'20px'}
          margin={"auto"}
          display={"flex"}
          flexDirection={'column'}
          boxShadow={'10px 10px 20px #ccc'}
        >
          <Typography textAlign={"center"} variant='h5' fontFamily={'Verdana'}>
            Add Movie   
          </Typography>
          {error && <Typography color="red">{error}</Typography>}
          
          <label>Movie Name</label>
          <TextField
            name='title'
            variant='standard'
            margin='normal'
            value={inputs.title}
            onChange={handleChange}
          />

          <label>Description</label>
          <TextField
            name='description'
            variant='standard'
            margin='normal'
            value={inputs.description}
            onChange={handleChange}
          />

          <label>Release Date</label>
          <TextField
            name='releaseDate'
            variant='standard'
            margin='normal'
            value={inputs.releaseDate}
            onChange={handleChange}
            type='date'
          />

          <label>Poster URL</label>
          <TextField
            name='posterUrl'
            variant='standard'
            margin='normal'
            value={inputs.posterUrl}
            onChange={handleChange}
          />

          <label>Banner URL</label>
          <TextField
            name='bannerUrl'
            variant='standard'
            margin='normal'
            value={inputs.bannerUrl}
            onChange={handleChange}
          />

          <label>Genre</label>
          <TextField
            name='genre'
            variant='standard'
            margin='normal'
            value={inputs.genre}
            onChange={handleChange}
          />

          <label>Duration</label>
          <TextField
            name='duration'
            variant='standard'
            margin='normal'
            value={inputs.duration}
            onChange={handleChange}
          />

          <label>Rating</label>
          <TextField
            name='rating'
            variant='standard'
            margin='normal'
            value={inputs.rating}
            onChange={handleChange}
          />

          <label>Cast</label>
          <Box display={'flex'} alignItems={'center'}>
            <TextField
              name='actor'
              variant='standard'
              margin='normal'
              value={actor}
              onChange={handleActorChange}
            />
            <Button onClick={addActor} sx={{ marginLeft: '10px' }}>Add</Button>
          </Box>
          <Box>
            {actors.length > 0 && (
              <Typography variant="body1">Actors: {actors.join(', ')}</Typography>
            )}
          </Box>

          <label>Featured</label>
          <Checkbox
            checked={inputs.featured}
            onChange={handleCheckboxChange}
          />

          <Button type='submit' variant='contained' sx={{ width: "30%", bgcolor: "#2b2d42", marginTop: '10px' }}>
            Add new movie
          </Button>
        </Box>
      </form>
    </div>
  );
};

export default AddMovie;
