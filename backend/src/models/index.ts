import { Sequelize } from 'sequelize';
import sequelize from './sequelize';
import { DB } from '../interfaces/databaseInterface';
import Movie from "./movie";
import RR from "./review";
import Genre from "./genre";
import MG from "./moviesGenres";

const db: DB = {
    Sequelize,
    sequelize,
};

db.Movie = Movie;
db.RR = RR;
db.Genre = Genre;
db.MG = MG;

db.Movie.hasMany(db.RR, { foreignKey: 'movie_id', as: 'ratingsReviews' });
db.RR.belongsTo(db.Movie, { foreignKey: 'movie_id', onDelete: 'CASCADE' });

db.Movie.hasMany(db.MG, { foreignKey: 'movie_id' });
db.MG.belongsTo(db.Movie, { foreignKey: 'movie_id', onDelete: 'CASCADE' });

db.Genre.hasMany(db.MG, { foreignKey: 'genre_id' });
db.MG.belongsTo(db.Genre, { foreignKey: 'genre_id', onDelete: 'CASCADE' });

db.Movie.belongsToMany(db.Genre, {
    through: db.MG,
    foreignKey: 'movie_id',
    as: 'genres',
    timestamps: false
});

db.Genre.belongsToMany(db.Movie, {
    through: db.MG,
    foreignKey: 'genre_id',
    timestamps: false
});

// const syncData =async () => {
//     try {
//         await sequelize.sync({
//             force: true
//         });
//     } catch (error) {
//         console.log(error)
//     }
// 
// }
// 
// syncData();

export default db;
