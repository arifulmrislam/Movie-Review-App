"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const sequelize_2 = __importDefault(require("./sequelize"));
class RR extends sequelize_1.Model {
}
RR.init({
    rr_id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    movie_id: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    user_id: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    rating: {
        type: sequelize_1.DataTypes.REAL,
        allowNull: false,
    },
    review: {
        type: sequelize_1.DataTypes.TEXT,
    },
}, {
    sequelize: sequelize_2.default,
    tableName: "Reviews_Ratings",
    timestamps: false,
});
exports.default = RR;
//# sourceMappingURL=review.js.map