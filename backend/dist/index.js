"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("cors"));
const path_1 = __importDefault(require("path"));
const sequelize_1 = __importDefault(require("./models/sequelize"));
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
const movieRoutes_1 = __importDefault(require("./routes/movieRoutes"));
const reviewRoutes_1 = __importDefault(require("./routes/reviewRoutes"));
const genreRoutes_1 = __importDefault(require("./routes/genreRoutes"));
const uploadRoutes_1 = __importDefault(require("./routes/uploadRoutes"));
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const port = 3000;
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use("/api/user", userRoutes_1.default);
app.use("/api/movie", movieRoutes_1.default);
app.use("/api/review", reviewRoutes_1.default);
app.use("/api/genre", genreRoutes_1.default);
app.use("/uploads", express_1.default.static(path_1.default.join(__dirname, "../uploads")));
app.use("/upload", uploadRoutes_1.default);
sequelize_1.default.sync({ alter: true }).then(() => {
    app.listen(port, () => {
        console.log(`Server is running on http://localhost:${port}`);
    });
});
//# sourceMappingURL=index.js.map