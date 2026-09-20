import { Router } from "express";
import { login, register, auth } from "./controller/user-controller";

export const router = Router();

router.post("/login", login);

router.post("/register", register);

router.get("/me", auth);
