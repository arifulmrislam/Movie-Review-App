import { Router } from "express";
import { getMovies, getMovieById, addMovie, updateMovie } from "../controllers/movieController";
import { addReview } from "../controllers/reviewController";
import { authMiddleware } from "../middleware/authMiddleware";

const router = Router();


router.get("/", getMovies);
router.get("/:id", getMovieById);
// Add a new movie (only logged-in users)
router.post("/", authMiddleware, addMovie);
// Edit a movie (only logged-in users)
router.put("/:id", authMiddleware, updateMovie);
// Add a review to a movie (any user)
router.post("/:id/reviews", addReview);

export default router;
