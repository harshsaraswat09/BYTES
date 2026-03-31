import { Router } from "express";
import { signup, signin, getMe } from "../controllers/auth.controller";
import { validate } from "../middleware/validate";
import { protect } from "../middleware/auth.middleware";
import { signupSchema, signinSchema } from "@bytes/common";

const router = Router();

// validate middleware runs BEFORE controller
router.post("/signup", validate(signupSchema), signup);
router.post("/signin", validate(signinSchema), signin);

// Protected route — token required
// protect middleware runs BEFORE controller
router.get("/me", protect, getMe);

export default router;