// import RR from "../models/Ratings&Reviews";
import { Request, Response } from "express";
import db from "../models";
import Review from "../models/review";
import User from '../models/user';

const RR = db.RR;

export const createReview = async (req: Request, res: Response): Promise<void> => {
    try {
        console.log("Received Data:", req.body);

        const { movie_id, user_id, rating, review } = req.body;

        // Check individual fields
        console.log("Movie ID:", movie_id);
        console.log("User ID:", user_id);
        console.log("Rating:", rating);
        console.log("review:", review);

        if (!movie_id || !user_id || typeof rating === 'undefined' || review === null || review === undefined) {
            console.error("Validation failed: Missing required fields");
            res.status(400).json({ error: "Missing required fields" });
            return;
        }

        // Validate rating (ensure it's a valid number)
        const parsedRating = parseFloat(rating);
        if (isNaN(parsedRating)) {
            console.error("Validation failed: Invalid rating");
            res.status(400).json({ error: "Invalid rating" });
            return;
        }

        // Create the review and save to DB
        const newReview = await RR.create({
            movie_id: Number(movie_id),
            user_id: Number(user_id),
            rating: parsedRating,
            review: review || "",
        });

        console.log("Review saved successfully:", newReview);
        res.status(201).json(newReview);
    } catch (error) {
        console.error("Error creating review:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};



export const updateReviewById = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        const updatedData = req.body;

        const rr = await RR.findByPk(id);

        if (!rr) {
            res.status(404).json({ error: "Review not found" });
            return;
        }

        //Ensure the user is the owner of the review 
        // new line added
        if (rr.user_id !== updatedData.user_id) {
            res.status(403).json({ error: "Unauthorized" });
            return;
        }

        await rr.update({
            rating: updatedData.rating,
            review: updatedData.review
        });

        res.status(200).json(rr);
    } catch (error) {
        console.error("Error updating review:", error);
        res.status(500).json({ error: "Failed to update review" });
    }
}

export const deleteReviewById = async (req: Request, res: Response): Promise<void> => {
    //new line added
    try {
        const { id } = req.params;

        // Extract and decode the token
        const token = req.headers.authorization?.split(' ')[1];
        if (!token) {
            console.error("No token provided");
            res.status(401).json({ error: "Unauthorized" });
            return;
        }

        console.log("Token:", token);

        const decodedToken = JSON.parse(atob(token.split('.')[1]));
        const userId = decodedToken.id;

        console.log("User ID from token:", userId);

        // Find the review by ID
        const review = await RR.findByPk(id);
        if (!review) {
            console.error("Review not found");
            res.status(404).json({ error: "Review not found" });
            return;
        }

        console.log("Review found:", review);

        // Ensure the user is the owner of the review
        if (review.user_id !== userId) {
            console.error("User is not the owner of the review");
            res.status(403).json({ error: "You can only delete your own reviews" });
            return;
        }

        // Delete the review
        await review.destroy();

        console.log("Review deleted successfully");
        res.status(200).json({ deleted: true });
    } catch (error) {
        console.error("Error deleting review:", error);
        res.status(500).json({ error: "Failed to delete review" });
    }
//     try {
//         const { id } = req.params;
// 
//         const rr = await RR.destroy({
//             where: {
//                 rr_id: Number(id)
//             }
//         });
// 
//         res.status(200).json({ deleted: true });
//     } catch (error) {
//         console.error("Error deleting review:", error);
//         res.status(500).json({ error: "Failed to delete review" });
//     }
}

export const getReviewsByMovieId = async (req: Request, res: Response): Promise<void> => {
    try {
        const movie_id = req.query.movie_id;

        if (!movie_id) {
            res.status(400).json({ message: "movie_id is required" });
            return;
        }

        console.log("Fetching reviews for movie_id:", movie_id);

        const reviews = await RR.findAll({
            where: { movie_id: Number(movie_id) },
            include: [
                {
                    model: User,
                    attributes: ['name', 'user_id'], // Ensure user ID is included
                    as: 'user'
                }
            ],
            attributes: ['rr_id', 'movie_id', 'user_id', 'rating', 'review'] // Ensure user_id is returned
        });

        res.status(200).json(reviews);
    } catch (error) {
        console.error("Error fetching reviews:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};