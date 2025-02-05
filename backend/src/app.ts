import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import movieRoutes from "./routes/movieRoutes";

dotenv.config();

const app = express();

app.use(cors());
app.use(bodyParser.json());

// Routes
app.use("/movies", movieRoutes);

export default app;
