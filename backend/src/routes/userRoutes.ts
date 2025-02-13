import express from "express";
import { signUpWithLogin, login } from "../controllers/userController"; 

const router = express.Router();

router.post("/signup", signUpWithLogin);
router.post("/login", login);

export default router;
