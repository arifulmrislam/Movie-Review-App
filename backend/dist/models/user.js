"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const sequelize_2 = __importDefault(require("./sequelize"));
const jsonwebtoken_1 = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
class User extends sequelize_1.Model {
    // Method to validate password
    validatePassword(password) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield bcrypt.compare(password, this.password);
        });
    }
    // Method to generate JWT token
    generateToken() {
        return (0, jsonwebtoken_1.sign)({ id: this.user_id }, process.env.JWT_SECRET, {
            expiresIn: "1h",
        });
    }
}
User.init({
    user_id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: sequelize_1.DataTypes.STRING(50),
    },
    email: {
        type: sequelize_1.DataTypes.STRING(50),
        unique: true,
        allowNull: false,
    },
    password: {
        type: sequelize_1.DataTypes.STRING(255),
        allowNull: false,
    },
}, {
    sequelize: sequelize_2.default,
    tableName: "Users",
    timestamps: false,
});
// Hash password before saving to database
User.addHook("beforeCreate", (user) => __awaiter(void 0, void 0, void 0, function* () {
    if (user.changed("password")) {
        user.password = yield bcrypt.hash(user.password, 8);
    }
}));
exports.default = User;
//# sourceMappingURL=user.js.map