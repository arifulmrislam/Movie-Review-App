import express from 'express';
import { Request, Response } from 'express';
import { createReview, deleteReviewById, updateReviewById, getReviewsByMovieId } from '../controllers/reviewController';
import RR from '../models/review';
import authenticateToken from '../middlewares/authMiddleware';

const router = express.Router();

router.get('/', getReviewsByMovieId);

// Route to create a new review (using controller function)
router.post('/', createReview);

// Route to update a review by its ID (using controller function)
router.put('/:id', updateReviewById);

// Route to delete a review by its ID (using controller function)
router.delete('/:id', deleteReviewById);

// export default router;
export default router;
