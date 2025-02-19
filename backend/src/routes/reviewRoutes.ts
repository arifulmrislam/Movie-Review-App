import express from 'express';
import { Request, Response } from 'express';
import { createReview, deleteReviewById, updateReviewById, getReviewsByMovieId } from '../controllers/reviewController';
import RR from '../models/review';
import authenticateToken from '../middlewares/authMiddleware';

const router = express.Router();

// router.get('/', getReviewsByMovieId);
// 
// router.post('/', async (req: Request, res: Response): Promise<void> => {
//     try {
//         const { movie_id, user_id, rating, comment } = req.body;
// 
//         console.log('Received Data:', req.body);
// 
//         if (!movie_id || !user_id || typeof rating === 'undefined' || !comment) {
//             res.status(400).json({ error: 'Missing required fields' });
//             return;
//         }
// 
//         const newReview = await RR.create({ movie_id, user_id, rating, comment });
// 
//         res.status(201).json(newReview);
//     } catch (error) {
//         console.error('Error saving review:', error);
//         res.status(500).json({ error: 'Internal Server Error' });
//     }
// });
// 
// router.put('/:id', updateReviewById);
// router.delete('/:id', deleteReviewById);
// Route to fetch reviews by movie ID
router.get('/', getReviewsByMovieId);

// Route to create a new review (using controller function)
router.post('/', createReview);

// Route to update a review by its ID (using controller function)
router.put('/:id', updateReviewById);

// Route to delete a review by its ID (using controller function)
router.delete('/:id', deleteReviewById);

// export default router;
export default router;
