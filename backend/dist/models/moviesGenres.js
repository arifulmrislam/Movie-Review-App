"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const sequelize_2 = __importDefault(require("./sequelize"));
class MG extends sequelize_1.Model {
}
MG.init({
    mg_id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    movie_id: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    genre_id: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
}, {
    sequelize: sequelize_2.default,
    tableName: "Movies_Genres",
    timestamps: false,
});
exports.default = MG;
//# sourceMappingURL=moviesGenres.js.map