"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const genreController_1 = require("../controllers/genreController");
const router = (0, express_1.Router)();
router.post("/", genreController_1.addGenre);
router.get("/", genreController_1.getAllGenres);
exports.default = router;
//# sourceMappingURL=genreRoutes.js.map