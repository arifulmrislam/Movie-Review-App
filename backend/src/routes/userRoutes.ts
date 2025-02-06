import { Router } from "express";
import { registerUser, loginUser, logoutUser } from "../controllers/userController";

const router = Router();

router.post("/resister", resisterUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);

export default router;