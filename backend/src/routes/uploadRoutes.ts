import { Router } from "express";
import { uploadImage } from "../controllers/uploadController";

const router: Router = Router();

router.post("/", uploadImage); // Ensure `uploadImage` is a valid function

export default router;
