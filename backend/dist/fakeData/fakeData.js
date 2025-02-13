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
const movie_1 = __importDefault(require("../models/movie"));
const genre_1 = __importDefault(require("../models/genre"));
const movieData = [
    {
        user_id: 1,
        title: "The Matrix",
        img: "http://imageurl.com/matrix.jpg",
        desc: "A computer hacker learns from mysterious rebels about the true nature of his reality and his role in the war against its controllers.",
        release_yr: 1999,
        length: 136,
        producer: "Warner Bros",
    },
    {
        user_id: 2,
        title: "Inception",
        img: "http://imageurl.com/inception.jpg",
        desc: "A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a CEO.",
        release_yr: 2010,
        length: 148,
        producer: "Legendary Entertainment",
    },
];
const genreData = [
    { genre: "Sci-Fi" },
    { genre: "Action" },
    { genre: "Thriller" },
];
// Inserting data into Genres table first (as Movie references Genre)
const insertData = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Insert genres
        const genres = yield Promise.all(genreData.map((g) => __awaiter(void 0, void 0, void 0, function* () { return yield genre_1.default.create(g); })));
        console.log("Genres inserted:", genres);
        // Insert movies
        const movies = yield Promise.all(movieData.map((m) => __awaiter(void 0, void 0, void 0, function* () { return yield movie_1.default.create(m); })));
        console.log("Movies inserted:", movies);
    }
    catch (error) {
        console.error("Error inserting data:", error);
    }
});
insertData();
//# sourceMappingURL=fakeData.js.map