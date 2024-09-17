import mongoose from 'mongoose';

const ShowSchema = new mongoose.Schema({
  theaterId: { type: mongoose.Schema.Types.ObjectId, ref: 'Theater', required: true },
  movieId: { type: mongoose.Schema.Types.ObjectId, ref: 'Movie', required: true },
  dates: [{ type: Date }],
  times: [{ type: String }],
});

const Show = mongoose.model('Show', ShowSchema);
export default Show;