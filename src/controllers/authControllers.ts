import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import User from "../database/models/User";
import { generateJwtToken } from "../utils/jwtUtils";

const register = async (req: Request, res: Response) => {
    try {
        const { username, password, email } = req.body;

        const userExists = await User.exists({ email: email.toLowerCase(), username });
        if (userExists) {
            return res.status(409).json({ message: "E-mail or username already in use" });
        }

        const encryptedPwd = await bcrypt.hash(password, 10);

        const user = await User.create({
            username,
            email: email.toLowerCase(),
            password: encryptedPwd,
        });

        const token = generateJwtToken(user);

        res.status(201).json({
            message: "User registered successfully",
            user: {
                id: user._id,
                username: user.username,
                email: user.email,
            },
            token,
        });
    } catch (err) {
        console.error("Error registering user:", err);
        res.status(500).json({ message: "Error registering user" });
    }
};

const login = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email: email.toLowerCase() });

        if (user && (await bcrypt.compare(password, user.password))) {
            const token = generateJwtToken(user);

            return res.status(201).json({
                message: "Login successful",
                user: {
                    id: user._id,
                    username: user.username,
                    email: user.email,
                },
                token,
            });
        }
        return res.status(400).json({ message: "Invalid Credentials" });
    } catch (err) {
        console.error("Error logging user:", err);
        res.status(500).json({ message: "Error logging in" });
    }
};

export { register, login };
