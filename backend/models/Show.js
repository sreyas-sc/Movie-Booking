const mongoose = require('mongoose');

const showSchema = new mongoose.Schema({
  theaterId: { type: mongoose.Schema.Types.ObjectId, ref: 'Theater', required: true },
  movieId: { type: mongoose.Schema.Types.ObjectId, ref: 'Movie', required: true },
  dates: [{ type: Date, required: true }],
  times: [{ type: String, required: true }],
});

const Show = mongoose.model('Show', showSchema);
module.exports = Show;