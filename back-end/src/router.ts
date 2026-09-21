import { Router } from "express";
import { login, register, auth, logout } from "./controller/user-controller";
import { authMiddleware } from "./middlewares/auth.middleware";

export const router = Router();

router.post("/login", login);

router.post("/register", register);

router.get("/me", authMiddleware, auth);

router.post("/logout", authMiddleware, logout);
