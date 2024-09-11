import express from 'express';
import { addMovie, getAllMovies, getMovieById } from '../controllers/movie-conteroller.js';
const movieRouter = express.Router();

// Route to add new movies by the admin
movieRouter.post("/", addMovie);

// Route to get the movies  list
movieRouter.get("/",getAllMovies);

// Route to get the movie by the Id of the movie
movieRouter.get("/:id",getMovieById);

// Route for booking
// movieRouter.get("/:id",getMovieById);

export default movieRouter;