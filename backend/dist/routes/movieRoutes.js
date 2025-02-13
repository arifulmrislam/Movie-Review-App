"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const movieController_1 = require("../controllers/movieController");
const router = (0, express_1.Router)();
router.get("/", movieController_1.getAllMovies);
router.post("/", movieController_1.createMovie);
router.get("/:id", movieController_1.getMovieById);
router.get("/user/:id", movieController_1.getMovieByUserId);
router.put("/:id", movieController_1.editMovie);
router.delete("/:id", movieController_1.deleteMovie);
exports.default = router;
//# sourceMappingURL=movieRoutes.js.map