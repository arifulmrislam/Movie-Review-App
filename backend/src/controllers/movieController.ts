import { Request, Response } from "express";
import Movie from "../models/movie";

export const getMovies = async (req: Request, res: Response) => {
    try {
        const movies = await Movie.findAll();
        res.json(movies);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch movies" });
    }
};
