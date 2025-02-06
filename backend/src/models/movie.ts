import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../config/database";

interface MovieAttributes {
    movie_id: number;
    user_id: number;
    movie_title: string;
    movie_img: string;
    movie_desc: string;
    release_year: number;
    director_name: string;
    duration_minutes: number;
    producer_name: string;
}

export interface MovieCreationAttributes extends Optional<MovieAttributes, 'movie_id'> { }

class Movie extends Model<MovieAttributes, MovieCreationAttributes> implements MovieAttributes {
    movie_id!: number;
    user_id!: number;
    movie_title!: string;
    movie_img!: string;
    movie_desc!: string;
    release_year!: number;
    director_name!: string;
    duration_minutes!: number;
    producer_name!: string;
}

Movie.init(
    {
        movie_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: { model: 'Users', key: 'user_id' }, // Foreign key to Users
        },
        movie_title: {
            type: DataTypes.STRING(100),
            allowNull: false,
            unique: true,
        },
        movie_img: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        movie_desc: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        release_year: {
            type: DataTypes.SMALLINT,
            allowNull: false,
        },
        director_name: {
            type: DataTypes.STRING(50),
            allowNull: false,
        },
        duration_minutes: {
            type: DataTypes.SMALLINT,
            allowNull: false,
        },
        producer_name: {
            type: DataTypes.STRING(50),
            allowNull: false,
        },
    },
    {
        sequelize,
        tableName: "Movies",
        underscored: true,
    }
);

export default Movie;
