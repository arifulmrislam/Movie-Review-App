import { Request, Response } from "express";
import User from "../models/user";

export const signUpWithLogin = async (req: Request, res: Response): Promise<void> => {
    try {
        const { email } = req.body;
        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
            res.status(400).json({ error: "Email is already in use" });
            return;
        }
        const user = await User.create(req.body);
        const token = user.generateToken();
        res.status(201).json({ user: user.toJSON(), token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to create user" });
    }
};

export const login = async (req: Request, res: Response): Promise<void> => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ where: { email } });
        if (!user) {
            res.status(400).json({ error: "User not found" });
            return;
        }
        const isPasswordValid = await user.validatePassword(password);
        if (!isPasswordValid) {
            res.status(401).json({ error: "Invalid credentials" });
            return;
        }
        const token = user.generateToken();
        res.status(200).json({ user: user.toJSON(), token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to authenticate user" });
    }
};
