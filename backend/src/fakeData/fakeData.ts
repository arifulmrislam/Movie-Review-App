import Movie from "../models/movie";
import Genre from "../models/genre";

const movieData = [
    {
        "user_id": 36,
        "title": "Blade Runner",
        "img": "https://upload.wikimedia.org/wikipedia/en/1/1c/Bladerunnervangeliscover.jpg",
        "desc": "A blade runner must pursue and terminate four replicants who stole a ship in space and have returned to Earth to find their creator.",
        "release_yr": 1982,
        "length": 117,
        "producer": "Warner Bros"
    },
    {
        "user_id": 37,
        "title": "Alien",
        "img": "https://upload.wikimedia.org/wikipedia/en/thumb/d/d5/1979_Alien_Design.jpg/220px-1979_Alien_Design.jpg",
        "desc": "The crew of a commercial spacecraft encounters a deadly lifeform after investigating an unknown transmission.",
        "release_yr": 1979,
        "length": 117,
        "producer": "20th Century Fox"
    },
    {
        "user_id": 38,
        "title": "The Thing",
        "img": "https://comicbook.com/wp-content/uploads/sites/4/2025/02/marvel-the-thing-costume-design-outfits-2005-2015-2025.jpg",
        "desc": "A research team in Antarctica is hunted by a shape-shifting alien that assumes the appearance of its victims.",
        "release_yr": 1982,
        "length": 109,
        "producer": "Universal Pictures"
    },
    {
        "user_id": 39,
        "title": "E.T. the Extra-Terrestrial",
        "img": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTOJBpnY7PPX0mTHy97W614XebClVq5d4O6nA&s",
        "desc": "A troubled child summons the courage to help a friendly alien escape Earth and return to his home world.",
        "release_yr": 1982,
        "length": 115,
        "producer": "Universal Pictures"
    },
    {
        "user_id": 40,
        "title": "Back to the Future",
        "img": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSfPG5MNcsCc936zlvStkGq6P3BDgkT_ZepZA&s",
        "desc": "Marty McFly, a 17-year-old high school student, is accidentally sent thirty years into the past in a time-traveling DeLorean invented by his close friend, the maverick scientist Doc Brown.",
        "release_yr": 1985,
        "length": 116,
        "producer": "Universal Pictures"
    },
    {
        "user_id": 41,
        "title": "Jurassic Park",
        "img": "https://upload.wikimedia.org/wikipedia/en/2/21/Jurassic_Park_%28book_cover%29.jpg",
        "desc": "During a preview tour, a theme park suffers a major power breakdown that allows its cloned dinosaur exhibits to run amok.",
        "release_yr": 1993,
        "length": 127,
        "producer": "Universal Pictures"
    },
    {
        "user_id": 42,
        "title": "Indiana Jones and the Raiders of the Lost Ark",
        "img": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS2QPCE8I2v37tUVdE0IfNceyf7G33tH28gFw&s",
        "desc": "Archaeologist Indiana Jones ventures to seize a biblical artefact known as the Ark of the Covenant, before the Nazis can obtain it.",
        "release_yr": 1981,
        "length": 115,
        "producer": "Paramount Pictures"
    },
    {
        "user_id": 43,
        "title": "The Empire Strikes Back",
        "img": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQTjXTAuuDTF7ejn_wFEO4h6ULfNw6Lk-CvLg&s",
        "desc": "After the rebels are overpowered by the Empire, Luke Skywalker begins Jedi training with Yoda, while his friends are pursued across the galaxy by Darth Vader.",
        "release_yr": 1980,
        "length": 124,
        "producer": "Lucasfilm"
    },
    {
        "user_id": 44,
        "title": "Return of the Jedi",
        "img": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSlpCTCXKRA742urrhztWheDclqlPMW_Ps0lg&s",
        "desc": "The Rebels dispatch to Endor to destroy the second Death Star, while Luke struggles to help Darth Vader back from the dark side.",
        "release_yr": 1983,
        "length": 131,
        "producer": "Lucasfilm"
    },
    {
        "user_id": 45,
        "title": "The Lord of the Rings: The Fellowship of the Ring",
        "img": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTpIv_3Xt4xwxUlmHg00-TylX4OQ698bEENtg&s",
        "desc": "A meek Hobbit from the Shire and eight companions set out on a journey to destroy the powerful One Ring and save Middle-earth from the Dark Lord Sauron.",
        "release_yr": 2001,
        "length": 178,
        "producer": "New Line Cinema"
    },
    {
        "user_id": 46,
        "title": "The Lord of the Rings: The Two Towers",
        "img": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQriwDD_dGwIXR4NramEl-_lyFdCEIWym0MAw&s",
        "desc": "While Frodo and Sam edge closer to Mordor with the help of the shifty Gollum, the divided fellowship makes a stand against Sauron's new ally, Saruman, and his hordes of Isengard.",
        "release_yr": 2002,
        "length": 179,
        "producer": "New Line Cinema"
    },
    {
        "user_id": 47,
        "title": "The Lord of the Rings",
        "img": "https://m.media-amazon.com/images/I/61Aiej9Od2L._AC_UF894,1000_QL80_.jpg",
        "desc": "Gandalf and Aragorn lead the World of Men against Sauron's army to draw his gaze from Frodo and Sam as they approach Mount Doom with the One Ring.",
        "release_yr": 2003,
        "length": 201,
        "producer": "New Line Cinema"
    },
    {
        "user_id": 48,
        "title": "The Hobbit: An Unexpected Journey",
        "img": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS8gM2iNAHXJKgu2tfFPzbG7f0jYjN9tMRKtg&s",
        "desc": "A reluctant Hobbit, Bilbo Baggins, sets out to the Lonely Mountain with a spirited group of dwarves to reclaim their mountain home, and the gold within it from the dragon Smaug.",
        "release_yr": 2012,
        "length": 169,
        "producer": "New Line Cinema"
    },
    {
        "user_id": 49,
        "title": "The Hobbit: The Desolation of Smaug",
        "img": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRz_dNKlRWUerlGivJAO0wvImbF6np2mPPsdQ&s",
        "desc": "The dwarves, along with Bilbo Baggins and Gandalf the Grey, continue their quest to reclaim Erebor, their homeland, from Smaug.",
        "release_yr": 2013,
        "length": 161,
        "producer": "New Line Cinema"
    },
    {
        "user_id": 50,
        "title": "The Hobbit: The Battle of the Five Armies",
        "img": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRz_dNKlRWUerlGivJAO0wvImbF6np2mPPsdQ&s",
        "desc": "Bilbo and company are forced to engage in a war against an array of combatants and keep the Lonely Mountain from falling into the hands of a rising darkness.",
        "release_yr": 2014,
        "length": 144,
        "producer": "New Line Cinema"
    },
    {
        "user_id": 51,
        "title": "Star Wars: Episode I - The Phantom Menace",
        "img": "https://m.media-amazon.com/images/I/61Aiej9Od2L._AC_UF894,1000_QL80_.jpg",
        "desc": "Two Jedi escape a hostile blockade to find allies and come across a young boy who may bring balance to the Force, but the long dormant Sith resurface to claim their old glory.",
        "release_yr": 1999,
        "length": 136,
        "producer": "Lucasfilm"
    },
    {
        "user_id": 52,
        "title": "Star Wars: Episode II - Attack of the Clones",
        "img": "https://m.media-amazon.com/images/I/61Aiej9Od2L._AC_UF894,1000_QL80_.jpg",
        "desc": "Ten years after initially meeting, Anakin Skywalker shares a forbidden romance with Padmé Amidala, while Obi-Wan Kenobi investigates an assassination attempt on the senator.",
        "release_yr": 2002,
        "length": 142,
        "producer": "Lucasfilm"
    },
    {
        "user_id": 53,
        "title": "Star Wars: Episode III - Revenge of the Sith",
        "img": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSlpCTCXKRA742urrhztWheDclqlPMW_Ps0lg&s",
        "desc": "Three years into the Clone Wars, Obi-Wan pursues a new threat, while Anakin is lured by Chancellor Palpatine into a sinister plot to rule the galaxy.",
        "release_yr": 2005,
        "length": 140,
        "producer": "Lucasfilm"
    },
    {
        "user_id": 54,
        "title": "Star Wars: Episode VII - The Force Awakens",
        "img": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSlpCTCXKRA742urrhztWheDclqlPMW_Ps0lg&s",
        "desc": "Three decades after the Empire's defeat, a new threat arises in the militant First Order. Defected stormtrooper Finn and the scavenger Rey are caught up in the Resistance's search for the missing Luke Skywalker.",
        "release_yr": 2015,
        "length": 138,
        "producer": "Lucasfilm"
    },
    {
        "user_id": 55,
        "title": "Star Wars: Episode VIII - The Last Jedi",
        "img": "https://m.media-amazon.com/images/I/61Aiej9Od2L._AC_UF894,1000_QL80_.jpg",
        "desc": "Rey develops her newly discovered abilities with the guidance of Luke Skywalker, who is unsettled by the strength of her powers. Meanwhile, the Resistance prepares for battle with the First Order.",
        "release_yr": 2017,
        "length": 152,
        "producer": "Lucasfilm"
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