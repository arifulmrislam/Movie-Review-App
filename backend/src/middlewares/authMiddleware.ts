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
        req.user = decoded; 
        next(); 
    } catch (error) {
        console.error("JWT Verification Error:", error);
        res.status(403).json({ error: 'Invalid token.' });
    }
};

export default authenticateToken;


