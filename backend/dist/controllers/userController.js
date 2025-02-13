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
exports.login = exports.signUpWithLogin = void 0;
const user_1 = __importDefault(require("../models/user"));
const signUpWithLogin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password, name } = req.body;
        const existingUser = yield user_1.default.findOne({ where: { email } });
        if (existingUser) {
            return res.status(400).json({ error: "Email is already in use" });
        }
        const user = yield user_1.default.create({ name, email, password });
        const token = user.generateToken(); // ✅ Now recognized
        res.status(201).json({ user: user.toJSON(), token });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to create user" });
    }
});
exports.signUpWithLogin = signUpWithLogin;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        const user = yield user_1.default.findOne({ where: { email } });
        if (!user) {
            return res.status(400).json({ error: "User not found" });
        }
        const isPasswordValid = yield user.validatePassword(password);
        if (!isPasswordValid) {
            return res.status(401).json({ error: "Invalid credentials" });
        }
        const token = user.generateToken(); // ✅ Now recognized
        res.status(200).json({ user: user.toJSON(), token });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to authenticate user" });
    }
});
exports.login = login;
//# sourceMappingURL=userController.js.map