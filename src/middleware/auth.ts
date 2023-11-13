import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { validateJwtSecretKey } from "../utils/jwtUtils";

const verifyToken = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization || req.headers.Authorization;

    if (!authHeader || Array.isArray(authHeader)) {
        return res.status(401).json({ message: "Missing or invalid token" });
    }

    try {
        const token = (authHeader as string).split(" ")[1];
        const decoded = jwt.verify(token, validateJwtSecretKey());

        req.user = decoded;

        return next();
    } catch (err: any) {
        console.error("Error decoding token", err);
        if (err.name === "TokenExpiredError") {
            return res.status(401).json({ message: "Token expired" });
        }

        return res.status(401).send({ message: "Invalid Token" });
    }
};

export { verifyToken };
