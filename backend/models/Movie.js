import mongoose from 'mongoose';

const movieSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    releaseDate: {
        type: Date,
        required: true,
    },
    posterUrl: {
        type: String,
        required: true,
    },
    bannerUrl: {
        type: String,
        required: true,
    },
    genre: {
        type: String,
        required: true,
    },
    duration: {
        type: String,
        required: true,
    },
    rating: {
        type: Number,
        required: true,
    },
    actors: {
        type: [String],
        required: true,
    },
    featured: {
        type: Boolean,
        default: false,
    },
    bookings: [{ type: mongoose.Types.ObjectId, ref: "Booking" }],
    admin: { 
        type: mongoose.Types.ObjectId,
        ref: "Admin",
        required: true,
    }
});

export default mongoose.model("Movie", movieSchema);
