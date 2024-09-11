
import mongoose from 'mongoose';
import Bookings from '../models/Bookings.js';
import Movie from '../models/Movie.js';


// Have some errors in this page (newBooking, booking)

export const newBooking = async (req, res, next) =>{
    const {movie, date, seatNumber, user}= req.body;


    // Validate the user and the movie
    let existingMovie;
    let existingUser;
    try{
        existingMovie = await Movie.findById(movie);
        existingUser = await user.findById(user);
    }
    catch(err){
        return console.log(err)
    }   
    if(!user){
        return res.status(404).json({message: "User not found with the given id"})
    }
    if(!existingMovie){
        return res.status(404).json({message :" Movie not found with the given id"})

    }
    let booking;

    try{ 
        booking = await Bookings({
            movie, 
            date: new Date(`${date}`), 
            seatNumber, 
            user
        }); // Assign the new booking object
        const session = await mongoose.startSession();
        session.startTransaction();
        existingUser.bookings.push(booking);
        existingMovie.bookings.push(booking);
        await  existingUser.save({session});
        await existingMovie.save({session});
        await booking.save({ session });
        session.commitTransaction();
             //Save the booking
    }
    catch(err){
        return console.log(err)
    }
    if(!newBooking){
        return res.status(500).json({message: "Booking failed"})
    }

    return res.status(200).json({ booking })
}

export const getBookingById = async (req, res, next) =>{
    const id = req.params.id;
    let booking;
    try{
        booking = await Bookings.findById(id)
    }   
    catch(err){
        return console.log(err)
    }

    if(!booking){
        return res.status(404).json({message: "Booking not found with the given id"})
    }
    return res.status(200).json({booking})
}

export const deleteBooking = async (req, res, next) => {
    const id = req.params.id;
    let booking;

    try{
        booking = await Bookings.findByIdAndRemove(id).populate("user movie");
        const session = await mongoose.startSession();
        session.startTransaction();
        await booking.user.bookings.pull(booking);
        await booking.movie.bookings.pull(booking);
        await booking.movie.save({session});
        await booking.user.save({session});

        session.commitTransaction();

    }catch(err){
        return console.log(err)
    }
    if(!booking){
        return res.status(500).json({ message : "Unable to delete "});
    }
    return res.status(200).json({ message : "Successfully deleted the booking"})

}