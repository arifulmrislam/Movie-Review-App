import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config/database';
import Genre from './genre';
import Movie from './movie';
import { MoviesGenresAttributes, MoviesGenresCreationAttributes } from "../types/moviesGenres.types";

class MoviesGenres extends Model<MoviesGenresAttributes, MoviesGenresCreationAttributes>
    implements MoviesGenresAttributes {
    moviesgenres_id!: number;
    genres_id!: number;
    movie_id!: number;
}

MoviesGenres.init(
    {
        moviesgenres_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true, 
        },
        genres_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: { model: 'Genres', key: 'genres_id' }, 
        },
        movie_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: { model: 'Movies', key: 'movie_id' }, 
        },
    },
    {
        sequelize,
        tableName: 'MoviesGenres',
        underscored: true,
    }
);

export default MoviesGenres;
