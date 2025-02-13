"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.upload = void 0;
// /middlewares/multerConfig.ts
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
// Configure Multer
const storage = multer_1.default.diskStorage({
    destination: (req, file, cb) => {
        const uploadPath = path_1.default.join(__dirname, "../../uploads");
        cb(null, uploadPath); // Directory to save the files
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
        cb(null, uniqueSuffix + path_1.default.extname(file.originalname)); // Unique filename
    },
});
exports.upload = (0, multer_1.default)({ storage });
//# sourceMappingURL=authMiddleware.js.map