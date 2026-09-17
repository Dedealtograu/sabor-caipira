import type { Request, Response } from "express";
import { db } from "./prisma/db";
import bcrypt from "bcrypt";
import { Router } from "express";
import { login, register } from "./controller/user-controller";

export const router = Router();

router.post("/login", login);

router.post("/register", register);