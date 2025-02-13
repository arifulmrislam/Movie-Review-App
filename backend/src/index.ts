import cors from "cors";
import path from "path";
import sequelize from "./models/sequelize";
import userRoute from "./routes/userRoutes";
import movieRoute from "./routes/movieRoutes";
import reviewRoute from "./routes/reviewRoutes";
import genreRoute from "./routes/genreRoutes";
import uploadRoute from "./routes/uploadRoutes";
import express, { Express } from "express";
import dotenv from "dotenv";

dotenv.config({ path: path.resolve(__dirname, "../.env") });

// console.log("JWT_SECRET:", process.env.JWT_SECRET);

const app: Express = express();
const port = 3000;

app.use(cors());
app.use(express.json());
app.use("/api/user", userRoute);
app.use("/api/movie", movieRoute);
app.use("/api/review", reviewRoute);
app.use("/api/genre", genreRoute);
app.use("/uploads", express.static(path.join(__dirname, "../uploads")));
app.use("/upload", uploadRoute);

sequelize.sync({ alter: true }).then(() => {
    app.listen(port, () => {
        console.log(`Server is running on http://localhost:${port}`);
    });
});
