"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const sequelize_2 = __importDefault(require("./sequelize"));
const movie_1 = __importDefault(require("./movie"));
const review_1 = __importDefault(require("./review"));
const genre_1 = __importDefault(require("./genre"));
const moviesGenres_1 = __importDefault(require("./moviesGenres"));
const db = {
    Sequelize: sequelize_1.Sequelize,
    sequelize: sequelize_2.default,
};
db.Movie = movie_1.default;
db.RR = review_1.default;
db.Genre = genre_1.default;
db.MG = moviesGenres_1.default;
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
exports.default = db;
//# sourceMappingURL=index.js.map