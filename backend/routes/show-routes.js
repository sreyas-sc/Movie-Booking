const Show = require('../models/Show.js');
const router = express.Router();

// POST /api/add-show
router.post('/add-show', async (req, res) => {
  try {
    const { theaterId, movieId, dates, times } = req.body;

    // Validate input
    if (!theaterId || !movieId || !dates || !times) {
      return res.status(400).json({ error: 'All fields are required.' });
    }

    // Create a new show document
    const newShow = new Show({
      theaterId,
      movieId,
      dates,
      times,
    });

    // Save to the database
    await newShow.save();

    // Respond with success
    res.status(201).json({ message: 'Show(s) added successfully.' });
  } catch (error) {
    console.error('Error adding show:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;