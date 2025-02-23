import authenticateToken from '../middlewares/authMiddleware';
import { Router } from 'express';
import {
    createMovie,
    deleteMovie,
    editMovie,
    getAllMovies,
    getMovieById,
    getMovieByUserId,
} from '../controllers/movieController';

const router = Router();

router.get("/", getAllMovies);
// router.post("/", (req, res, next) => authenticateToken(req, res, next), createMovie);  // Protect this route with the auth middleware
router.post("/", authenticateToken, createMovie);
router.get("/:id", getMovieById);
router.get("/user/:id", getMovieByUserId);
router.put("/:id", editMovie);
router.delete("/:id", deleteMovie);

export default router;
