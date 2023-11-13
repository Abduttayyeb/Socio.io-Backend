import express from "express";
import { login, register } from "../controllers/authControllers";
import { createValidator } from "express-joi-validation";
import { registerSchema, loginSchema } from "../validationSchemas";
import { verifyToken } from "../middleware/auth";

const router = express.Router();
const validator = createValidator();

router.post("/register", validator.body(registerSchema), register);
router.post("/login", validator.body(loginSchema), login);

export default router;
