import type { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const { user } = req.cookies;

  if (!process.env.JWT_SECRET) {
    res.status(500).json({ message: "Erro interno do servidor" });
    return;
  }

  try {
    const decoded = jwt.verify(user, process.env.JWT_SECRET!);

    req.user = decoded;
    next();
  } catch (error) {
    console.error("Erro ao autenticar:", error);
    res.status(500).json({ message: "Erro ao autenticar" });
    return;
  }
}