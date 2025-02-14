import Movie from "../models/movie";
import Genre from "../models/genre";

const movieData = [
    {
        "user_id": 1,
        "title": "The Matrix",
        "img": "https://www.tvtime.com/_next/image?url=https%3A%2F%2Fartworks.thetvdb.com%2Fbanners%2Fmovies%2F169%2Fposters%2F5f274c00c85c1.jpg&w=640&q=75",
        "desc": "A computer hacker learns from mysterious rebels about the true nature of his reality and his role in the war against its controllers.",
        "release_yr": 1999,
        "length": 136,
        "producer": "Warner Bros"
    },
    {
        "user_id": 2,
        "title": "Inception",
        "img": "https://m.media-amazon.com/images/I/61AYEacqlkL._AC_UF894,1000_QL80_.jpg",
        "desc": "A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a CEO.",
        "release_yr": 2010,
        "length": 148,
        "producer": "Legendary Entertainment"
    },
    {
        "user_id": 3,
        "title": "The Shawshank Redemption",
        "img": "https://media.s-bol.com/Y4YMXj1ZGw0/550x792.jpg",
        "desc": "Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.",
        "release_yr": 1994,
        "length": 142,
        "producer": "Columbia Pictures"
    },
    {
        "user_id": 4,
        "title": "The Godfather",
        "img": "https://miro.medium.com/v2/resize:fit:1170/1*Gp-AhI3fuWvRRWz3YBpkaA.jpeg",
        "desc": "The aging patriarch of an organized crime dynasty transfers control of his clandestine empire to his reluctant son.",
        "release_yr": 1972,
        "length": 175,
        "producer": "Paramount Pictures"
    },
    {
        "user_id": 5,
        "title": "Pulp Fiction",
        "img": "https://edisonfilmhub.cz/DATA/FILMY/PREV2/pulp-fiction.jpg",
        "desc": "The lives of two mob hitmen, a boxer, a gangster's wife, and a pair of diner bandits intertwine in four tales of violence and redemption.",
        "release_yr": 1994,
        "length": 154,
        "producer": "Miramax Films"
    },
    {
        "user_id": 6,
        "title": "The Dark Knight",
        "img": "https://static0.colliderimages.com/wordpress/wp-content/uploads/sharedimages/2024/04/the-dark-knight-poster.jpg",
        "desc": "When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, the caped crusader must come to terms with one of the greatest psychological tests of his ability to fight injustice.",
        "release_yr": 2008,
        "length": 152,
        "producer": "Warner Bros"
    },
    {
        "user_id": 7,
        "title": "Fight Club",
        "img": "https://rukminim3.flixcart.com/image/850/1000/kmxsakw0/poster/w/w/j/large-fight-club-movie-posters-fight-club-hd-poster-12-fight-original-imagfq7phpvygq4z.jpeg?q=90&crop=false",
        "desc": "An insomniac office worker and a devil-may-care soapmaker form an underground fight club that evolves into something much, much more.",
        "release_yr": 1999,
        "length": 139,
        "producer": "20th Century Fox"
    },
    {
        "user_id": 8,
        "title": "The Lord of the Rings: The Fellowship of the Ring",
        "img": "https://m.media-amazon.com/images/M/MV5BNzIxMDQ2YTctNDY4MC00ZTRhLTk4ODQtMTVlOWY4NTdiYmMwXkEyXkFqcGc@._V1_.jpg",
        "desc": "A meek Hobbit from the Shire and eight companions set out on a journey to destroy the powerful One Ring and save Middle-earth from the Dark Lord Sauron.",
        "release_yr": 2001,
        "length": 178,
        "producer": "New Line Cinema"
    },
    {
        "user_id": 9,
        "title": "The Lord of the Rings: The Two Towers",
        "img": "https://m.media-amazon.com/images/M/MV5BMGQxMDdiOWUtYjc1Ni00YzM1LWE2NjMtZTg3Y2JkMjEzMTJjXkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg",
        "desc": "While Frodo and Sam edge closer to Mordor with the help of the shifty Gollum, the divided fellowship makes a stand against Sauron's new ally, Saruman, and his hordes of Isengard.",
        "release_yr": 2002,
        "length": 179,
        "producer": "New Line Cinema"
    },
    {
        "user_id": 10,
        "title": "The Lord of the Rings: The Return of the King",
        "img": "https://m.media-amazon.com/images/M/MV5BMTZkMjBjNWMtZGI5OC00MGU0LTk4ZTItODg2NWM3NTVmNWQ4XkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg",
        "desc": "Gandalf and Aragorn lead the World of Men against Sauron's army to draw his gaze from Frodo and Sam as they approach Mount Doom with the One Ring.",
        "release_yr": 2003,
        "length": 201,
        "producer": "New Line Cinema"
    },
    {
        "user_id": 11,
        "title": "Forrest Gump",
        "img": "https://m.media-amazon.com/images/M/MV5BNDYwNzVjMTItZmU5YS00YjQ5LTljYjgtMjY2NDVmYWMyNWFmXkEyXkFqcGc@._V1_.jpg",
        "desc": "The presidencies of Kennedy and Johnson, the Vietnam War, the 1960s counterculture, the Watergate scandal, and other historical events unfold through the life story of a man with a low IQ.",
        "release_yr": 1994,
        "length": 142,
        "producer": "Paramount Pictures"
    },
    {
        "user_id": 12,
        "title": "The Silence of the Lambs",
        "img": "https://m.media-amazon.com/images/M/MV5BNDdhOGJhYzctYzYwZC00YmI2LWI0MjctYjg4ODdlMDExYjBlXkEyXkFqcGc@._V1_.jpg",
        "desc": "A young F.B.I. cadet must receive the help of an incarcerated and manipulative cannibal killer to help catch another serial killer, a madman who skins his victims.",
        "release_yr": 1991,
        "length": 118,
        "producer": "Orion Pictures"
    }
];

const genreData = [
    { genre: "Sci-Fi" },
    { genre: "Action" },
    { genre: "Thriller" },
];

// Inserting data into Genres table first (as Movie references Genre)
const insertData = async () => {
    try {
        // Insert genres (avoid duplicate entries)
        const genres = await Promise.all(
            genreData.map(async (g) => {
                const existingGenre = await Genre.findOne({ where: { genre: g.genre } });
                return existingGenre ? existingGenre : await Genre.create(g);
            })
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