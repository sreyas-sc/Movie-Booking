import express from 'express';
import { addShow, getAllShows } from '../controllers/show-controller.js'; // Note the .js extension

const router = express.Router();

// POST /api/add-show
router.route('/addshow').post(addShow);

router.route('/getallshows').get(getAllShows)

export default router;
