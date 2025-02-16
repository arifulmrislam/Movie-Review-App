// import { Request, Response } from "express";
// import { upload } from "../middlewares/fileUploadMiddleware";
// 
// export const uploadImage = (req: Request, res: Response) => {
//     upload.single("image")(req, res, (err) => {
//         if (err) {
//             console.error("Upload Error:", err); // 🔍 Log the error
//             return res.status(500).json({ error: "Error uploading file." });
//         }
//         if (!req.file) {
//             console.error("Upload Error: No file received"); // 🔍 Log missing file
//             return res.status(400).json({ error: "No file uploaded." });
//         }
// 
//         const fileUrl = `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`;
// 
//         res.status(200).json({
//             message: "File uploaded successfully!",
//             filePath: fileUrl,
//         });
//     });
// };

import { Request, Response } from "express";
import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, "../../uploads"));
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    },
});

const upload = multer({ storage });

export const uploadImage = async (req: Request, res: Response) => {
    upload.single("image")(req, res, async (err) => {
        if (err) {
            return res.status(500).json({ error: "Upload failed" });
        }

        if (!req.file) {
            return res.status(400).json({ error: "No file uploaded" });
        }

        const imageUrl = `http://localhost:3000/uploads/${req.file.filename}`;
        res.json({ success: true, imageUrl });
    });
};

