
import mongoose from 'mongoose';
import Bookings from '../models/Bookings.js';
import Movie from '../models/Movie.js';


// Have some errors in this page (newBooking, booking)

// export const newBooking = async (req, res, next) =>{
//     const {movie, date, seatNumber, user}= req.body;


//     // Validate the user and the movie
//     let existingMovie;
//     let existingUser;
//     try{
//         existingMovie = await Movie.findById(movie);
//         existingUser = await user.findById(user);
//     }
//     catch(err){
//         return console.log(err)
//     }   
//     if(!user){
//         return res.status(404).json({message: "User not found with the given id"})
//     }
//     if(!existingMovie){
//         return res.status(404).json({message :" Movie not found with the given id"})

//     }
//     let booking;

//     try{ 
//         booking = await Bookings({
//             movie, 
//             date: new Date(`${date}`), 
//             seatNumber, 
//             user
//         }); // Assign the new booking object
//         const session = await mongoose.startSession();
//         session.startTransaction();
//         existingUser.bookings.push(booking);
//         existingMovie.bookings.push(booking);
//         await  existingUser.save({session});
//         await existingMovie.save({session});
//         await booking.save({ session });
//         session.commitTransaction();
//              //Save the booking
//     }
//     catch(err){
//         return console.log(err)
//     }
//     if(!newBooking){
//         return res.status(500).json({message: "Booking failed"})
//     }

//     return res.status(200).json({ booking })
// }


// POST /api/bookings/new
export const newBooking = async (req, res) => {
    console.log("backend call works for the add bookings")
    console.log(req.body)
    const { movieName, movieId, theaterName, theaterId, date, time, seatNumbers, totalAmount, userId, paymentId } = req.body;
  
    try {
      // Create a new booking instance
      const booking = new Bookings({
        movieName,
        movieId,
        theaterName,
        theaterId,
        date,
        time,
        seatNumbers,
        totalAmount,
        userId,
        paymentId,
        paymentStatus: 'pending',
      });
  
      // Save the booking to the database
      const savedBooking = await booking.save();
  
      // Send the response with the booking data
      return res.status(201).json({ message: 'Booking successful', booking: savedBooking });
    } catch (error) {
      console.error('Error creating booking:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  };
  
  // Get booking by ID
  export const getBookingById = async (req, res) => {
    const id = req.params.id;
    let booking;
  
    try {
      booking = await Booking.findById(id);
    } catch (err) {
      return console.log(err);
    }
  
    if (!booking) {
      return res.status(404).json({ message: "Booking not found with the given ID" });
    }
    return res.status(200).json({ booking });
  };
  
  // Delete a booking by ID
  export const deleteBooking = async (req, res) => {
    const id = req.params.id;
    let booking;
  
    try {
      booking = await Booking.findByIdAndRemove(id).populate("user movie");
      const session = await mongoose.startSession();
      session.startTransaction();
      await booking.user.bookings.pull(booking);
      await booking.movie.bookings.pull(booking);
      await booking.movie.save({ session });
      await booking.user.save({ session });
  
      await session.commitTransaction();
    } catch (err) {
      return console.log(err);
    }
  
    if (!booking) {
      return res.status(500).json({ message: "Unable to delete" });
    }
  
    return res.status(200).json({ message: "Successfully deleted the booking" });
  };