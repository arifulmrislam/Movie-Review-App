"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const sequelize_2 = __importDefault(require("./sequelize"));
class Movie extends sequelize_1.Model {
}
Movie.init({
    movie_id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    user_id: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    title: {
        type: sequelize_1.DataTypes.STRING(50),
        unique: true,
        allowNull: false,
    },
    img: {
        type: sequelize_1.DataTypes.TEXT,
    },
    desc: {
        type: sequelize_1.DataTypes.TEXT,
    },
    release_yr: {
        type: sequelize_1.DataTypes.SMALLINT,
        allowNull: false,
    },
    length: {
        type: sequelize_1.DataTypes.SMALLINT,
    },
    producer: {
        type: sequelize_1.DataTypes.STRING(50),
    },
}, {
    sequelize: sequelize_2.default,
    tableName: "Movies",
    timestamps: false,
});
exports.default = Movie;
//# sourceMappingURL=movie.js.map