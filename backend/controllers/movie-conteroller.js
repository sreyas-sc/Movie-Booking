import jwt from 'jsonwebtoken';
import Movie from '../models/Movie.js';
import mongoose from 'mongoose';
import Admin from '../models/Admin.js';

export const addMovie = async (req, res, next) =>{
    // Bearer token
    const extractedToken =  req.headers.authorization.split(" ")[1]; 
    if(!extractedToken && extractedToken.trim() === ""){
        return res.status(404).json({message : "Token not found"})
    }
   
    console.log(extractedToken)

    // adminid stored inside the movieschema

    let adminId;
     // Verify token
     jwt.verify(extractedToken,'MYSECRETKEY', (err, decrypted) =>{
        if(err){
            return res.status(400).json({ message : `${err.message}`});
        }
        else{
            adminId = decrypted.id;
            return;
        }
     });

    // Create a new movie
    const  {title, description,releaseDate, posterUrl, duration, featured } = req.body;
    if(!title && title.trim() ==="" &&  
    !description && description.trim() ==="" && 
    !posterUrl && posterUrl.trim() ==="" &&
    !duration && duration.trim() ==="")
    {
        res.status(402).json({mesage :"Invalid inputs"})
    }

    // create new movie
    let movie;
    try{
        movie = new Movie({
             title,
             description,
             releaseDate : new Date( `${releaseDate}` ),
             posterUrl, 
             duration, 
             featured, 
             admin: adminId,
            });

    // we need to 
    const session = await mongoose.startSession();
    const adminUser = await Admin.findById(adminId);
    session.startTransaction();
    await movie.save({session});

    adminUser.addedMovies.push(movie);//added movie
    await adminUser.save({ session });
        
    await session.commitTransaction(); //commit the transaction

    // movie= await movie.save();
    }catch(err){
        return console.log(err);
    }
    if (!movie){
        return res.status(500).json({ message: "Movie creation failed" });
    }
    return res.status(201).json({ movie })
};

// send and verify the token from the header , when the admin login


// Get the movie list
export const getAllMovies = async (req, res, next ) =>{
    let movies;
    try{
        movies = await Movie.find();
    }
    catch(err){
        return console.log(err)
    }

    if(!movies){
        return res.status(500).json({ message: "Request failed, No movies found" });
    }
    return res.status(200).json({ movies })
}
  

// 


export const getMovieById = async (req, res, next) => {
    const id = req.params.id;
    let movie;
    try {
        movie = await Movie.findById(id);
    } catch (err) {
        return res.status(500).json({ message: "Failed to retrieve movie" });
    }
    if (!movie) {
        return res.status(404).json({ message: "Movie not found" });
    }
    return res.status(200).json({ movie });
}
