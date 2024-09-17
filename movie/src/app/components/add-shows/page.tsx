// 'use client';
// import { useEffect, useState } from 'react';
// import axios from 'axios';
// import { getAllMovies } from '@/app/api-helpers/api-helpers'; // Adjust the import path as needed

// interface Theater {
//   id: string;
//   name: string;
//   location: string;
//   seatLayout: number[];
//   showtimes: { time: string; _id: string }[];
// }

// interface Movie {
//   _id: string;
//   title: string;
//   posterUrl: string;
//   releaseDate: string;
//   duration: string; // Adjust this if your API provides duration
// }

// const AddShows = () => {
//   const [theater, setTheater] = useState<Theater | null>(null);
//   const [movies, setMovies] = useState<Movie[]>([]);
//   const [selectedMovie, setSelectedMovie] = useState<string | null>(null);
//   const [dates, setDates] = useState<string[]>([]);
//   const [selectedTimes, setSelectedTimes] = useState<Set<string>>(new Set());
//   const [movieDetails, setMovieDetails] = useState<Movie | null>(null);

//   useEffect(() => {
//     // Retrieve theater data from localStorage
//     const theaterData = localStorage.getItem('selectedTheater');
//     if (theaterData) {
//       setTheater(JSON.parse(theaterData));
//       localStorage.removeItem('selectedTheater');
//     }

//     // Fetch list of movies
//     const fetchMovies = async () => {
//       try {
//         const data = await getAllMovies();
//         setMovies(data.movies);
//       } catch (error) {
//         console.error('Error fetching movies:', error);
//       }
//     };

//     fetchMovies();
//   }, []);

//   useEffect(() => {
//     if (selectedMovie) {
//       const movie = movies.find((movie) => movie._id === selectedMovie);
//       setMovieDetails(movie || null);
//     }
//   }, [selectedMovie, movies]);

//   const handleAddShow = async () => {
//     if (!theater || !selectedMovie || dates.length === 0 || selectedTimes.size === 0) {
//       alert('Please select a movie, date(s), and time(s).');
//       return;
//     }

//     try {
//       // Define formData with the necessary payload
//       const formData = {
//         theaterId: theater.id,
//         movieId: selectedMovie,
//         dates,
//         times: Array.from(selectedTimes), // Assuming `selectedTimes` is a Set or similar
//       };
    
//       // Make the API call using the `addShow` function
//       addShow(formData)
//         .then((res) => {
//           console.log('Show added successfully:', res);
//           alert('Shows added successfully');
//           // Optionally reset state or redirect if needed
//         })
//         .catch((err) => {
//           console.error('Error adding shows:', err);
//           alert('Failed to add shows');
//         });
//     } catch (error) {
//       console.error('Unexpected error adding shows:', error);
//       alert('An unexpected error occurred');
//     }
    

//   const handleAddDate = () => {
//     setDates([...dates, '']);
//   };

//   const handleDateChange = (index: number, value: string) => {
//     const newDates = [...dates];
//     newDates[index] = value;
//     setDates(newDates);
//   };

//   const handleRemoveDate = (index: number) => {
//     const newDates = dates.filter((_, i) => i !== index);
//     setDates(newDates);
//   };

//   const handleToggleTime = (time: string) => {
//     const newTimes = new Set(selectedTimes);
//     if (newTimes.has(time)) {
//       newTimes.delete(time);
//     } else {
//       newTimes.add(time);
//     }
//     setSelectedTimes(newTimes);
//   };

//   return (
//     <div style={{ padding: '20px', maxWidth: '1200px', margin: 'auto', display: 'flex', gap: '20px' }}>
//       <div style={{ flex: 1, backgroundColor: '#f9f9f9', borderRadius: '8px', padding: '20px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
//         <h1 style={{ fontSize: '24px', marginBottom: '20px' }}>Add Shows</h1>
//         {theater ? (
//           <div>
//             <h2 style={{ fontSize: '20px', marginBottom: '10px' }}>{theater.name}</h2>
//             <p style={{ fontSize: '16px', marginBottom: '20px' }}>Location: {theater.location}</p>
//             <div style={{ marginBottom: '20px' }}>
//               <label style={{ fontSize: '16px' }}>Select Movie:</label>
//               <select
//                 value={selectedMovie || ''}
//                 onChange={(e) => setSelectedMovie(e.target.value)}
//                 style={{ marginLeft: '10px', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
//               >
//                 <option value="">-- Select a movie --</option>
//                 {movies.map((movie) => (
//                   <option key={movie._id} value={movie._id}>
//                     {movie.title}
//                   </option>
//                 ))}
//               </select>
//             </div>
//             <div style={{ marginBottom: '20px' }}>
//               <label style={{ fontSize: '16px' }}>Add Dates:</label>
//               <button
//                 onClick={handleAddDate}
//                 style={{ marginLeft: '10px', padding: '8px 12px', border: 'none', borderRadius: '4px', backgroundColor: '#007bff', color: '#fff', cursor: 'pointer' }}
//               >
//                 Add Date
//               </button>
//               {dates.map((date, index) => (
//                 <div key={index} style={{ marginTop: '10px', display: 'flex', alignItems: 'center' }}>
//                   <input
//                     type="date"
//                     value={date}
//                     onChange={(e) => handleDateChange(index, e.target.value)}
//                     style={{ marginRight: '10px', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
//                   />
//                   <button
//                     onClick={() => handleRemoveDate(index)}
//                     style={{ color: 'red', background: 'none', border: 'none', cursor: 'pointer' }}
//                   >
//                     Remove
//                   </button>
//                 </div>
//               ))}
//             </div>
//             <div style={{ marginBottom: '20px' }}>
//               <label style={{ fontSize: '16px' }}>Select Times:</label>
//               <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginTop: '10px' }}>
//                 {theater.showtimes.map((showtime) => (
//                   <button
//                     key={showtime._id}
//                     onClick={() => handleToggleTime(showtime.time)}
//                     style={{
//                       padding: '10px 20px',
//                       border: 'none',
//                       borderRadius: '5px',
//                       backgroundColor: selectedTimes.has(showtime.time) ? '#007bff' : '#f8f9fa',
//                       color: selectedTimes.has(showtime.time) ? '#fff' : '#000',
//                       cursor: 'pointer',
//                       transition: 'background-color 0.3s ease',
//                     }}
//                   >
//                     {showtime.time}
//                   </button>
//                 ))}
//               </div>
//             </div>
//             <button
//               onClick={handleAddShow}
//               style={{
//                 padding: '10px 20px',
//                 border: 'none',
//                 borderRadius: '5px',
//                 backgroundColor: '#28a745',
//                 color: '#fff',
//                 cursor: 'pointer',
//                 marginTop: '20px',
//                 transition: 'background-color 0.3s ease',
//               }}
//             >
//               Add Show(s)
//             </button>
//           </div>
//         ) : (
//           <p>No theater selected.</p>
//         )}
//       </div>
//       {movieDetails && (
//         <div style={{ flex: 1, backgroundColor: '#f9f9f9', borderRadius: '8px', padding: '20px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
//           <h2 style={{ fontSize: '20px', marginBottom: '10px' }}>Selected Movie</h2>
//           <div style={{ border: '1px solid #ddd', padding: '10px', borderRadius: '8px', backgroundColor: '#fff', display: 'flex', alignItems: 'center', gap: '20px' }}>
//             <img
//               src={movieDetails.posterUrl}
//               alt={movieDetails.title}
//               style={{ width: '100px', height: '150px', objectFit: 'cover', borderRadius: '8px' }}
//             />
//             <div>
//               <h3 style={{ fontSize: '18px', marginBottom: '10px' }}>{movieDetails.title}</h3>
//               <p style={{ fontSize: '16px', marginBottom: '5px' }}>Release Date: {new Date(movieDetails.releaseDate).toLocaleDateString()}</p>
//               <p style={{ fontSize: '16px' }}>Duration: {movieDetails.duration}</p>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default AddShows;
'use client'
import { useEffect, useState } from 'react';
import axios from 'axios';
import { getAllMovies } from '@/app/api-helpers/api-helpers.js'; // Adjust the import path as needed
import { addShows } from '@/app/api-helpers/api-helpers.js';

interface Theater {
  _id: string;
  name: string;
  location: string;
  seatLayout: number[];
  showtimes: { time: string; _id: string }[];
}

interface Movie {
  _id: string;
  title: string;
  posterUrl: string;
  releaseDate: string;
  duration: string;
}

const AddShows = () => {
  const [theater, setTheater] = useState<Theater | null>(null);
  const [movies, setMovies] = useState<Movie[]>([]);
  const [selectedMovie, setSelectedMovie] = useState<string | null>(null);
  const [dates, setDates] = useState<string[]>([]);
  const [selectedTimes, setSelectedTimes] = useState<Set<string>>(new Set());
  const [movieDetails, setMovieDetails] = useState<Movie | null>(null);

  useEffect(() => {
    // Retrieve theater data from localStorage
    const theaterData = localStorage.getItem('selectedTheater');
    if (theaterData) {
      setTheater(JSON.parse(theaterData));
      localStorage.removeItem('selectedTheater');
    }

    // Fetch list of movies
    const fetchMovies = async () => {
      try {
        const data = await getAllMovies();
        setMovies(data.movies);
      } catch (error) {
        console.error('Error fetching movies:', error);
      }
    };

    fetchMovies();
  }, []);

  useEffect(() => {
    if (selectedMovie) {
      const movie = movies.find((movie) => movie._id === selectedMovie);
      setMovieDetails(movie || null);
    }
  }, [selectedMovie, movies]);

  const handleAddShow = async () => {
    console.log("!@!@!@!@")
    if (!theater || !selectedMovie || dates.length === 0 || selectedTimes.size === 0) {
      alert('Please select a movie, date(s), and time(s).');
      return;
    }

    try {
      console.log("Theatre id is___:", theater._id)
      const formData = {
        theaterId: theater._id,
        movieId: selectedMovie,
        dates,
        times: Array.from(selectedTimes),
      };
  
     addShows(formData)
     .then((res) => console.log('Show added:', res))
     .catch((err) => console.error('Error adding show:', err));
    } catch (error) {
      console.error('Error adding shows:', error);
      alert('Failed to add shows');
    }
  };

  const handleAddDate = () => {
    setDates([...dates, '']);
  };

  const handleDateChange = (index: number, value: string) => {
    const newDates = [...dates];
    newDates[index] = value;
    setDates(newDates);
  };

  const handleRemoveDate = (index: number) => {
    const newDates = dates.filter((_, i) => i !== index);
    setDates(newDates);
  };

  const handleToggleTime = (time: string) => {
    const newTimes = new Set(selectedTimes);
    if (newTimes.has(time)) {
      newTimes.delete(time);
    } else {
      newTimes.add(time);
    }
    setSelectedTimes(newTimes);
  };

  return (
    <div style={{ padding: '20px', maxWidth: '1200px', margin: 'auto', display: 'flex', gap: '20px' }}>
      <div style={{ flex: 1, backgroundColor: '#f9f9f9', borderRadius: '8px', padding: '20px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
        <h1 style={{ fontSize: '24px', marginBottom: '20px' }}>Add Shows</h1>
        {theater ? (
          <div>
            <h2 style={{ fontSize: '20px', marginBottom: '10px' }}>{theater.name}</h2>
            <p style={{ fontSize: '16px', marginBottom: '20px' }}>Location: {theater.location}</p>
            <div style={{ marginBottom: '20px' }}>
              <label style={{ fontSize: '16px' }}>Select Movie:</label>
              <select
                value={selectedMovie || ''}
                onChange={(e) => setSelectedMovie(e.target.value)}
                style={{ marginLeft: '10px', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
              >
                <option value="">-- Select a movie --</option>
                {movies.map((movie) => (
                  <option key={movie._id} value={movie._id}>
                    {movie.title}
                  </option>
                ))}
              </select>
            </div>
            <div style={{ marginBottom: '20px' }}>
              <label style={{ fontSize: '16px' }}>Add Dates:</label>
              {dates.map((date, index) => (
                <div key={index} style={{ marginBottom: '10px' }}>
                  <input
                    type="date"
                    value={date}
                    onChange={(e) => handleDateChange(index, e.target.value)}
                    style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ccc', marginRight: '10px' }}
                  />
                  <button onClick={() => handleRemoveDate(index)}>Remove</button>
                </div>
              ))}
              <button onClick={handleAddDate}>Add Date</button>
            </div>
            <div>
              <label style={{ fontSize: '16px' }}>Select Times:</label>
              {['10:00 AM', '1:00 PM', '4:00 PM', '7:00 PM'].map((time) => (
                <div key={time}>
                  <input
                    type="checkbox"
                    checked={selectedTimes.has(time)}
                    onChange={() => handleToggleTime(time)}
                  />
                  <label style={{ marginLeft: '8px' }}>{time}</label>
                </div>
              ))}
            </div>
            <button onClick={handleAddShow} style={{ marginTop: '20px', padding: '10px 20px', backgroundColor: '#007BFF', color: 'white', border: 'none', borderRadius: '4px' }}>
              Add Show
            </button>
          </div>
        ) : (
          <p>Loading theater data...</p>
        )}
      </div>
    </div>
  );
};

export default AddShows;
