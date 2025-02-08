import { DataTypes, Model } from "sequelize";
import sequelize from "./sequelize";

class MG extends Model {
    public movie_id!: number;
    public genre_id!: number;
}

MG.init(
    {
        mg_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        movie_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        genre_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    },
    {
        sequelize,
        tableName: "Movies_Genres",
        timestamps: false,
    }
);

export default MG;