import express from "express";
import { signUpWithLogin, login, getUserProfile } from "../controllers/userController"; 
import authenticateToken from "../middlewares/authMiddleware";

const router = express.Router();

router.post("/signup", signUpWithLogin);
router.post("/login", login);
router.get("/me", authenticateToken, getUserProfile);

export default router;
