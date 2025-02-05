import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database";

class Movie extends Model { }

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
        modelName: "Movie",
        tableName: "Movies",
        timestamps: false,
    }
);

export default Movie;
