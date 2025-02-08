import Movie from "../models/movie";
import Genre from "../models/genre";

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
const insertData = async () => {
    try {
        // Insert genres
        const genres = await Promise.all(
            genreData.map(async (g) => await Genre.create(g))
        );
        console.log("Genres inserted:", genres);

        // Insert movies
        const movies = await Promise.all(
            movieData.map(async (m) => await Movie.create(m))
        );
        console.log("Movies inserted:", movies);

    } catch (error) {
        console.error("Error inserting data:", error);
    }
};

insertData();