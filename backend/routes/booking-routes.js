import express from 'express';
import { getBookingById, newBooking } from '../controllers/booking-controller.js';

const bookingsRouter = express.Router();

bookingsRouter.post("/book",newBooking);

bookingsRouter.get("/:id",getBookingById);

bookingsRouter.delete("/:id",);




export default bookingsRouter;