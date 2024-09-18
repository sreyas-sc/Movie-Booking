
import mongoose from 'mongoose';
import Bookings from '../models/Bookings.js';
import Movie from '../models/Movie.js';
import razorpay from "razorpay"
import QRCode from 'qrcode';
import dotenv from 'dotenv';
import  Twilio  from 'twilio';

dotenv.config();

const client = new Twilio(process.env.ACCOUNT_SID, process.env.AUTH_TOKEN );

async function sendWhatsappMessage(to, message) {
  try {
    const response = await client.messages.create({
      body: message,
      from: `whatsapp:${process.env.WHATSAPP_NO}`,  // Twilio WhatsApp sandbox number
      to: `whatsapp:${+918111904512}`,  // Customer's WhatsApp number
    });
    console.log("Message sent, SID:", response.sid);
  } catch (error) {
    console.error("Error sending WhatsApp message:", error);
    throw new Error("Error sending WhatsApp message");
  }
}

const razorpayInstance = new razorpay({
  key_id: process.env.KEY_ID,
  key_secret: process.env.KEY_SECRET,
});

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
        paymentStatus: 'paid',
      });
  
      // Save the booking to the database
      const savedBooking = await booking.save();
    
      await sendWhatsappMessage(
        '+918111904512', 
        `Hi! Your booking for *${movieName}* on *${new Date(date).toLocaleDateString('en-IN')}* at *${time}* is confirmed!`
      );
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


  // Razorpay setup
  export const razorpayOrder = async (req, res) => {
  try {
    const { totalAmount, userId, movieName, theaterName, bookingDate, phoneNumber } = req.body;

    // Create Razorpay order
    const razorpayOrder = await razorpayInstance.orders.create({
      amount: totalAmount * 100,  // Amount in paise
      currency: 'INR',
      receipt: 'receipt_id',
    });

    // Send the response back first
    res.json({
      key: process.env.RAZORPAY_KEY_ID,  // Your Razorpay Key ID
      amount: razorpayOrder.amount,
      currency: razorpayOrder.currency,
      orderId: razorpayOrder.id,  // Razorpay order ID
    });
  } catch (error) {
    console.error('Error creating Razorpay order:', error);
    // In case of error, ensure response hasn't been sent already
    if (!res.headersSent) {
      res.status(500).json({ error: 'Failed to create Razorpay order' });
    }
  }
};


  