import jwt from "jsonwebtoken";
import { UserDocument } from "../database/models/User";

const validateJwtSecretKey = (): string => {
    const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;
    if (!JWT_SECRET_KEY) {
        console.error("SECRET_KEY is not defined. Check the environment configuration.");
        process.exit(1);
    }
    return JWT_SECRET_KEY;
};

const generateJwtToken = (user: UserDocument): string => {
    const JWT_SECRET_KEY = validateJwtSecretKey();
    return jwt.sign(
        {
            userId: user._id,
            email: user.email,
        },
        JWT_SECRET_KEY,
        {
            expiresIn: "24h",
        }
    );
};

export { validateJwtSecretKey, generateJwtToken };
