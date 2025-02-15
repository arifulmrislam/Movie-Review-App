// import jwt from 'jsonwebtoken';
// import { Request, Response, NextFunction } from 'express';
// 
// const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
//     const token = req.headers.authorization?.split(' ')[1]; //extracts token from Bearer token
//     if (!token) return res.status(401).send('Access denied. No token provided.');
// 
//     try {
//         const decoded = jwt.verify(token, process.env.JWT_SECRET);
//         req.user = decoded;
//         next();
//     } catch (ex) {
//         res.status(400).send('Invalid token.');
//     }
// };
// 
// export default authenticateToken;

// import jwt from "jsonwebtoken";
// import { Request, Response, NextFunction } from "express";
// 
// const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
//     const token = req.headers["authorization"]?.split(" ")[1]; // Assumes token is passed as Bearer <token>
//     if (!token) {
//         return res.status(401).json({ message: "Authentication required" });
//     }
// 
//     jwt.verify(token, process.env.JWT_SECRET as string, (err, user) => {
//         if (err) {
//             return res.status(403).json({ message: "Invalid token" });
//         }
//         req.user = user;
//         next();
//     });
// };
// 
// export default authenticateToken;

import jwt, { JwtPayload } from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

// Extend Request type
interface AuthenticatedRequest extends Request {
    user?: JwtPayload | { id: number };
}

const authenticateToken = (req: AuthenticatedRequest, res: Response, next: NextFunction): void => {
    const token = req.headers.authorization?.split(' ')[1]; // Extract token from "Bearer <token>"
    console.log("Received Token:", token);

    if (!token) {
        res.status(401).json({ error: 'Access denied. No token provided.' });
        return;
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as JwtPayload;
        console.log("Decoded Token:", decoded);
        req.user = decoded; // Attach user to request
        next(); // Call next() to continue
    } catch (error) {
        console.error("JWT Verification Error:", error);
        res.status(403).json({ error: 'Invalid token.' });
    }
};

export default authenticateToken;


