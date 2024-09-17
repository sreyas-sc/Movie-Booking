import express from 'express';
import { addShow } from '../controllers/show-controller.js'; // Note the .js extension

const router = express.Router();

// POST /api/add-show
router.route('/addshow').post(addShow);

export default router;
