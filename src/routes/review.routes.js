import express from 'express';
import { getReviews, createReview } from '../controllers/review.controller.js';

const router = express.Router();

router.get('/', getReviews);
router.post('/', createReview);

export default router;
