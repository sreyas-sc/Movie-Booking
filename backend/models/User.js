import mongoose from "mongoose";
import Bookings from '../models/Bookings.js';
const Schema= mongoose.Schema;
const userSchema = new Schema({
    phone: {
        type: Number,
        require : true,
    },
    email:{
        type: String,
        require: true,
        unique: true,
    },
    password: {
        type: String,
        require: true,
        minLength: 6,
    },
    Bookings:[{type: mongoose.Types.ObjectId, ref:"Booking"}]
});

const user = mongoose.model("users", userSchema);

export default user;

// users 