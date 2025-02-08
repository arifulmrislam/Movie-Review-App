import { DataTypes, Model } from "sequelize";
import sequelize from "./sequelize";
import { MovieAttributes, MovieCreationAttributes } from "../types/movie.type";

class Movie extends Model<MovieAttributes, MovieCreationAttributes> { }

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
        },
        title: {
            type: DataTypes.STRING(50),
            unique: true,
            allowNull: false,
        },
        img: {
            type: DataTypes.TEXT,
        },
        desc: {
            type: DataTypes.TEXT,
        },
        release_yr: {
            type: DataTypes.SMALLINT,
            allowNull: false,
        },
        length: {
            type: DataTypes.SMALLINT,
        },
        producer: {
            type: DataTypes.STRING(50),
        },
    },
    {
        sequelize,
        tableName: "Movies",
        timestamps: false,
    }
);

export default Movie;