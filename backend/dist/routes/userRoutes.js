"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userController_1 = require("../controllers/userController");
const router = (0, express_1.Router)();
router.post("/signup", userController_1.signUpWithLogin);
router.post("/", userController_1.login);
// router.get("/", getAllUsers);
exports.default = router;
//# sourceMappingURL=userRoutes.js.map