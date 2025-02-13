"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const sequelize_2 = __importDefault(require("./sequelize"));
class Genre extends sequelize_1.Model {
}
Genre.init({
    genre_id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    genre: {
        type: sequelize_1.DataTypes.STRING(10),
        unique: true,
        allowNull: false,
    },
}, {
    sequelize: sequelize_2.default,
    tableName: "Genres",
    timestamps: false,
});
exports.default = Genre;
//# sourceMappingURL=genre.js.map