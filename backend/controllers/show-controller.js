import Show from '../models/Show.js';

// Add a new show
export const addShow = async (req, res) => {
  console.log(req.body);
  try {
    const { theaterId, movieId, dates, times } = req.body;
    console.log(req.body)

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
};


// get all the shows
export const getAllShows = async (req, res) => {
  console.log("backend function to retreive all the shows")
  try {
    // Fetch all show documents from the database
    const shows = await Show.find().populate('theaterId').populate('movieId');

    // Respond with the list of shows
    res.status(200).json(shows);
  } catch (error) {
    console.error('Error fetching shows:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
