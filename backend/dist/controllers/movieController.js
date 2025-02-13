"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllMovies = exports.deleteMovie = exports.editMovie = exports.getMovieByUserId = exports.getMovieById = exports.createMovie = void 0;
const sequelize_1 = __importDefault(require("../models/sequelize"));
const user_1 = __importDefault(require("../models/user"));
const models_1 = __importDefault(require("../models"));
const sequelize_2 = require("sequelize");
const Movie = models_1.default.Movie;
const Genre = models_1.default.Genre;
const MG = models_1.default.MG;
const RR = models_1.default.RR;
const createMovie = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { user_id, title, img, desc, release_yr, length, producer, genre, } = req.body;
    try {
        const transaction = yield sequelize_1.default.transaction();
        try {
            const movie = yield Movie.create({ user_id, title, img, desc, release_yr, length, producer }, { transaction });
            if (!movie.dataValues.movie_id) {
                throw new Error("Movie ID is null after creation");
            }
            const genreInstances = yield Promise.all(genre.map((g) => __awaiter(void 0, void 0, void 0, function* () { return Genre.findOrCreate({ where: { genre: g }, transaction }); })));
            const movieGenreAssociations = genreInstances.map(([genreInstance]) => ({
                movie_id: movie.dataValues.movie_id,
                genre_id: genreInstance.genre_id,
            }));
            yield MG.bulkCreate(movieGenreAssociations, { transaction });
            yield transaction.commit();
            res.status(201).json({ message: "Movie created successfully", movie });
        }
        catch (error) {
            yield transaction.rollback();
            throw error;
        }
    }
    catch (error) {
        if (error.errors && error.errors[0].message == 'title must be unique') {
            console.error("Error during movie creation:", error);
            res.status(400).json({ error: "title must be unique" });
        }
        else {
            console.error("Error during movie creation:", error);
            res.status(500).json({ error: "Failed to create movie" });
        }
    }
});
exports.createMovie = createMovie;
const getMovieById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const movie = yield Movie.findByPk(req.params.id);
        if (!movie) {
            res.status(404).json({ error: "Movie not found" });
            return;
        }
        const ratings = yield RR.findAll({
            where: { movie_id: movie.dataValues.movie_id },
        });
        const user = yield user_1.default.findOne({
            where: { user_id: movie.dataValues.user_id },
        });
        const averageRating = ratings.reduce((sum, item) => sum + item.dataValues.rating, 0) /
            (ratings.length || 1);
        const genres = yield MG.findAll({
            where: { movie_id: movie.dataValues.movie_id },
            include: [{ model: Genre, attributes: ["genre"] }],
        });
        const rr = yield Promise.all(ratings.map((rating) => __awaiter(void 0, void 0, void 0, function* () {
            const user = yield user_1.default.findOne({
                where: { user_id: rating.dataValues.user_id },
            });
            return {
                rr_id: rating === null || rating === void 0 ? void 0 : rating.dataValues.rr_id,
                user_id: user === null || user === void 0 ? void 0 : user.dataValues.user_id,
                user: user === null || user === void 0 ? void 0 : user.dataValues.name,
                review: rating.dataValues.review,
                rating: rating.dataValues.rating,
            };
        })));
        res.status(200).json(Object.assign(Object.assign({}, movie.dataValues), { rating: averageRating || null, genres: genres.map((x) => { var _a; return ((_a = x.dataValues.Genre) === null || _a === void 0 ? void 0 : _a.genre) || "Unknown Genre"; }), user: (user === null || user === void 0 ? void 0 : user.dataValues.name) || "Unknown User", rr }));
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to fetch movie" });
    }
});
exports.getMovieById = getMovieById;
const getMovieByUserId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const movies = yield Movie.findAll({
            where: { user_id: req.params.id },
            attributes: {
                include: [
                    [
                        sequelize_2.Sequelize.fn("AVG", sequelize_2.Sequelize.col("ratingsReviews.rating")),
                        "averageRating",
                    ],
                ],
            },
            include: [
                {
                    model: RR,
                    as: "ratingsReviews",
                    attributes: [],
                },
                {
                    model: Genre,
                    as: "genres",
                    attributes: ["genre"],
                    through: { attributes: [] },
                },
            ],
            group: ["Movie.movie_id", "genres.genre_id"],
            order: [["movie_id", "DESC"]],
        });
        res.status(200).json(movies);
    }
    catch (error) {
        console.error("Error fetching movies with genres and ratings:", error);
        res
            .status(500)
            .json({ error: "Failed to fetch movies with genres and ratings" });
    }
});
exports.getMovieByUserId = getMovieByUserId;
const editMovie = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const updatedData = req.body;
        const movie = yield Movie.findByPk(id);
        if (!movie) {
            res.status(404).json({ error: "Movie not found" });
            return;
        }
        yield movie.update(updatedData);
        res.status(200).json(movie);
    }
    catch (error) {
        if (error.errors && error.errors[0].message == 'title must be unique') {
            console.error("Error updating movie:", error.errors[0].message);
            res.status(500).json({ error: "title must be unique" });
        }
        else {
            console.error("Error updating movie:", error);
            res.status(500).json({ error: "Failed to update movie" });
        }
    }
});
exports.editMovie = editMovie;
const deleteMovie = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const movie = yield Movie.destroy({
            where: {
                movie_id: id,
            },
        });
        const rr = yield RR.destroy({
            where: {
                movie_id: id,
            },
        });
        const mg = yield MG.destroy({
            where: {
                movie_id: id,
            },
        });
        res.status(200).json({ deleted: true });
    }
    catch (error) {
        console.error("Error deleting movie:", error);
        res.status(500).json({ error: "Failed to delete movie" });
    }
});
exports.deleteMovie = deleteMovie;
const getAllMovies = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { title, genre } = req.query;
        const queryOptions = {
            attributes: {
                include: [
                    [
                        sequelize_2.Sequelize.fn("AVG", sequelize_2.Sequelize.col("ratingsReviews.rating")),
                        "averageRating",
                    ],
                ],
            },
            include: [
                {
                    model: RR,
                    as: "ratingsReviews",
                    attributes: [],
                },
                {
                    model: Genre,
                    as: "genres",
                    attributes: ["genre"],
                    through: { attributes: [] },
                },
            ],
            group: ["Movie.movie_id", "genres.genre_id"],
            order: [["movie_id", "DESC"]],
        };
        if (title) {
            queryOptions.where = Object.assign(Object.assign({}, queryOptions.where), { title: {
                    [sequelize_2.Op.iLike]: `%${title}%`,
                } });
        }
        if (genre) {
            queryOptions.include[1].where = { genre };
        }
        const movies = yield Movie.findAll(queryOptions);
        if (movies.length === 0) {
            res.status(200).json({ message: "No movies found" });
        }
        else {
            res.status(200).json(movies);
        }
    }
    catch (error) {
        console.error("Error searching for movies:", error);
        res.status(500).json({ error: "Failed to search for movies" });
    }
});
exports.getAllMovies = getAllMovies;
//# sourceMappingURL=movieController.js.map