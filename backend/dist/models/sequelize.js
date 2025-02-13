"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sequelize = void 0;
const sequelize_1 = require("sequelize");
const database_1 = __importDefault(require("../config/database"));
exports.sequelize = new sequelize_1.Sequelize(database_1.default.DB_NAME, database_1.default.DB_USERNAME, database_1.default.DB_PASSWORD, {
    host: database_1.default.DB_HOST,
    dialect: database_1.default.dialect,
    logging: false,
    port: database_1.default.DB_PORT
});
exports.sequelize
    .authenticate()
    .then(() => {
    console.log("Database connected successfully");
})
    .catch((err) => {
    console.error("Unable to connect to the database:", err);
});
exports.default = exports.sequelize;
//# sourceMappingURL=sequelize.js.map