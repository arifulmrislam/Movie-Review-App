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
exports.getAllGenres = exports.addGenre = void 0;
// import Genre from "../models/Genre";
const models_1 = __importDefault(require("../models"));
const Genre = models_1.default.Genre;
const addGenre = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const genre = yield Genre.create(req.body);
        res.status(201).json(genre);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to create genre" });
    }
});
exports.addGenre = addGenre;
const getAllGenres = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const genres = yield Genre.findAll();
        res.status(200).json(genres);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to fetch genres" });
    }
});
exports.getAllGenres = getAllGenres;
//# sourceMappingURL=genreController.js.map