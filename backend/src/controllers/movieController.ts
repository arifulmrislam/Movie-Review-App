import { Request, Response } from "express";
import { Op, Sequelize } from "sequelize";
import Movie from "../models/movie";
import Review from "../models/review";
import Genre from "../models/genre";

/**
 * Fetch all movies with optional search & filters.
 * Supports search by title and filtering by genre or publisher.
 */
export const getMovies = async (req: Request, res: Response) => {
    const { search, genre, publisher } = req.query;
    const where: any = {};

    if (search) where.movie_title = { [Op.iLike]: `%${search}%` };
    if (publisher) where.publisher = { [Op.iLike]: `%${publisher}%` };
    if (genre) where["$Genres.genre$"] = genre;

    try {
        const movies = await Movie.findAll({
            include: [
                { model: Genre, through: { attributes: [] } },
                { model: Review, attributes: [] },
            ],
            attributes: {
                include: [
                    [Sequelize.fn("AVG", Sequelize.col("Reviews.rating")), "avg_rating"],
                ],
            },
            group: ["Movie.movie_id", "Genres.genres_id"],
            where,
        });
        res.json(movies);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch movies" });
    }
};

/**
 * Fetch details of a specific movie.
 */
export const getMovieById = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        const movie = await Movie.findByPk(id, {
            include: [
                { model: Genre, through: { attributes: [] } },
                { model: Review },
            ],
            attributes: {
                include: [
                    [Sequelize.fn("AVG", Sequelize.col("Reviews.rating")), "avg_rating"],
                ],
            },
            group: ["Movie.movie_id", "Genres.genres_id", "Reviews.review_id"],
        });

        if (!movie) {
            return res.status(404).json({ error: "Movie not found" });
        }

        res.json(movie);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch movie details" });
    }
};

/**
 * Add a new movie (logged-in users only).
 */
export const addMovie = async (req: Request, res: Response) => {
    try {
        const { movie_title, description, release_date, publisher, genres, image_url } = req.body;

        // Ensure movie title is unique
        const existingMovie = await Movie.findOne({ where: { movie_title } });
        if (existingMovie) {
            return res.status(400).json({ error: "Movie title must be unique" });
        }

        const newMovie = await Movie.create({ movie_title, description, release_date, publisher, image_url });

        // Associate genres if provided
        if (genres && genres.length > 0) {
            const genreRecords = await Genre.findAll({ where: { genre: genres } });
            await newMovie.setGenres(genreRecords);
        }

        res.status(201).json(newMovie);
    } catch (error) {
        res.status(500).json({ error: "Failed to add movie" });
    }
};

/**
 * Update a movie (logged-in users only).
 */
export const updateMovie = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { movie_title, description, release_date, publisher, genres, image_url } = req.body;

    try {
        const movie = await Movie.findByPk(id);
        if (!movie) {
            return res.status(404).json({ error: "Movie not found" });
        }

        // Ensure movie title is unique if updating
        if (movie_title && movie_title !== movie.movie_title) {
            const existingMovie = await Movie.findOne({ where: { movie_title } });
            if (existingMovie) {
                return res.status(400).json({ error: "Movie title must be unique" });
            }
        }

        await movie.update({ movie_title, description, release_date, publisher, image_url });

        // Update genres if provided
        if (genres && genres.length > 0) {
            const genreRecords = await Genre.findAll({ where: { genre: genres } });
            await movie.setGenres(genreRecords);
        }

        res.json({ message: "Movie updated successfully", movie });
    } catch (error) {
        res.status(500).json({ error: "Failed to update movie" });
    }
};
