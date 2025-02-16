import { DataTypes, Model } from "sequelize";
import sequelize from "./sequelize";

class RR extends Model { }

RR.init(
    {
        rr_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        movie_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            field: "movie_id",
        },
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        rating: {
            type: DataTypes.REAL,
            allowNull: false,
        },
        review: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
    },
    {
        sequelize,
        tableName: "Reviews_Ratings",
        timestamps: false,
    }
);

export default RR;