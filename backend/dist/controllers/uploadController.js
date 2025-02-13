"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadImage = void 0;
const authMiddleware_1 = require("../middlewares/authMiddleware");
const uploadImage = (req, res) => {
    authMiddleware_1.upload.single("image")(req, res, (err) => {
        if (err) {
            return res.status(500).send("Error uploading file.");
        }
        if (!req.file) {
            return res.status(400).send("No file uploaded.");
        }
        res.status(200).json({
            message: "File uploaded successfully!",
            filePath: `/uploads/${req.file.filename}`,
        });
    });
};
exports.uploadImage = uploadImage;
//# sourceMappingURL=uploadController.js.map