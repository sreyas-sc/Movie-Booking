import jwt from 'jsonwebtoken';
import Movie from '../models/Movie.js';
import mongoose from 'mongoose';
import Admin from '../models/Admin.js';

export const addMovie = async (req, res, next) => {
    const extractedToken = req.headers.authorization.split(" ")[1]; 
    if (!extractedToken || extractedToken.trim() === "") {
        return res.status(404).json({ message: "Token not found" });
    }

    let adminId;
    jwt.verify(extractedToken, 'MYSECRETKEY', (err, decrypted) => {
        if (err) {
            return res.status(400).json({ message: `${err.message}` });
        } else {
            adminId = decrypted.id;
            return;
        }
    });

    const { title, description, releaseDate, posterUrl, bannerUrl, genre, duration, rating, actors, featured } = req.body;
    if (!title || !description || !posterUrl || !bannerUrl || !duration || !rating || actors.length === 0) {
        return res.status(400).json({ message: "Invalid inputs" });
    }

    let movie;
    try {
        movie = new Movie({
            title,
            description,
            releaseDate: new Date(releaseDate),
            posterUrl,
            bannerUrl,
            genre,
            duration,
            rating,
            actors,
            featured,
            admin: adminId,
        });

        const session = await mongoose.startSession();
        const adminUser = await Admin.findById(adminId);
        session.startTransaction();
        await movie.save({ session });

        adminUser.addedMovies.push(movie);
        await adminUser.save({ session });

        await session.commitTransaction();
    } catch (err) {
        return console.log(err);
    }

    if (!movie) {
        return res.status(500).json({ message: "Movie creation failed" });
    }
    return res.status(201).json({ movie });
};


// send and verify the token from the header , when the admin login


// Get the movie list
// export const getAllMovies = async (req, res, next ) =>{
//     let movies;
//     try{
//         movies = await Movie.find();
//     }
//     catch(err){
//         return console.log(err)
//     }

//     if(!movies){
//         return res.status(500).json({ message: "Request failed, No movies found" });
//     }
//     return res.status(200).json({ movies })
// }

export const getAllMovies = async (req, res, next) => {
    const { genre, rating, showtime } = req.query;
  
    let filters = {};
    
    if (genre) filters.genre = genre;
    if (rating) filters.rating = { $gte: rating }; // example for filtering movies with a minimum rating
    if (showtime) filters.showtime = showtime; // assuming you have a showtime field
  
    try {
      const movies = await Movie.find(filters);
      if (!movies || movies.length === 0) {
        return res.status(404).json({ message: "No movies found" });
      }
      return res.status(200).json({ movies });
    } catch (err) {
      return res.status(500).json({ message: "Request failed, no movies found" });
    }
  };
  
  

// 


// export const getMovieById = async (req, res, next) => {
//     const id = req.params.id;
//     let movie;
//     try {
//         movie = await Movie.findById(id);
//     } catch (err) {
//         return res.status(500).json({ message: "Failed to retrieve movie" });
//     }
//     if (!movie) {
//         return res.status(404).json({ message: "Movie not found" });
//     }
//     return res.status(200).json({ movie });
// }


export const getMovieById = async (req, res) => {
    const movieId = req.params.id;
    console.log(`Fetching movie with ID: ${movieId}`); // Log the ID
  
    try {
      const movie = await Movie.findById(movieId); // Replace with your actual method to fetch movie
      if (!movie) {
        console.error('Movie not found');
        return res.status(404).json({ message: 'Movie not found' });
      }
      console.log('Movie found:', movie); // Log the movie details
      return res.status(200).json({ movie });
    } catch (error) {
      console.error('Error fetching movie:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  };
  