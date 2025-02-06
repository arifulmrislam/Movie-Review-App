import sequelize from '../config/database';
import User from './user';
import Movie from './movie';
import Review from './review';
import Genre from './genre';
import MoviesGenres from './moviesGenres';

// Associations
User.hasMany(Movie, { foreignKey: 'user_id' });
Movie.belongsTo(User, { foreignKey: 'user_id' });

Movie.hasMany(Review, { foreignKey: 'movie_id' });
Review.belongsTo(Movie, { foreignKey: 'movie_id' });

Review.belongsTo(User, { foreignKey: 'user_id' });
User.hasMany(Review, { foreignKey: 'user_id' });

Movie.belongsToMany(Genre, { through: MoviesGenres, foreignKey: 'movie_id' });
Genre.belongsToMany(Movie, { through: MoviesGenres, foreignKey: 'genres_id' });

export { sequelize, User, Movie, Review, Genre, MoviesGenres };
