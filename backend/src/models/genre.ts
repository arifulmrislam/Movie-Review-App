import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config/database';

interface GenreAttributes {
    genres_id: number;
    genre: string;
}

export interface GenreCreationAttributes extends Optional<GenreAttributes, 'genres_id'> { }

class Genre extends Model<GenreAttributes, GenreCreationAttributes> implements GenreAttributes {
    genres_id!: number;
    genre!: string;
}

Genre.init(
    {
        genres_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true, 
        },
        genre: {
            type: DataTypes.STRING(10), 
            unique: true,
            allowNull: false,
        },
    },
    {
        sequelize,
        tableName: 'Genres',
        underscored: true,
    }
);

export default Genre;
