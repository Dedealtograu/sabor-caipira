import type { Request, Response } from "express";
import bcrypt from "bcrypt";
import { prisma } from "../db";
import jwt from "jsonwebtoken";

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "E-mail e senha são obrigatórios" });
    }

    const user = await prisma.user.findFirst({ where: { email } })

    if (!user) {
      return res.status(404).json({ message: "Usuário não encontrado" });
    }

    const match = await bcrypt.compare(password, user?.password);

    if (!match) {
      return res.status(401).json({ message: "E-mail ou senha inválidos" });
    }

    const { password: _, ...userWithoutPassword } = user;

    const token = jwt.sign(userWithoutPassword, process.env.JWT_SECRET!);

    res.cookie("user", token, { maxAge: 1000 * 1000 })

    res.status(200).json({ user: userWithoutPassword });
  } catch (error) {
    console.error("Erro ao fazer login:", error);
    res.status(500).json({ message: "Erro interno do servidor" });
  }
}

export const register = async (req: Request, res: Response) => {
  try {
    const { name, email, password, mission } = req.body;

    if (!name || !email || !password || !mission) {
      return res.status(400).json({ message: "Todos os campos são obrigatórios" });
    }

    const user = await prisma.user.findFirst({ where: { email } })

    if (user?.email) {
      return res.status(409).json({ message: "Usuário já cadastrado" });
    }

    const hash = await bcrypt.hash(password, 10);

    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        password: hash,
        mission
      }
    })

    res.status(201).json({ newUser });
  } catch (error) {
    console.error("Erro ao registrar usuário:", error);
    res.status(500).json({ message: "Erro interno do servidor" });
    return
  }
}

export const auth = async (req: Request, res: Response) => {
  try {
    const { user } = req

    res.status(200).json(user);
    return;
  } catch (error) {
    console.error("Erro ao autenticar:", error);
    return res.status(500).json({ message: "Erro ao autenticar" });
  }
}

export const logout = async (req: Request, res: Response) => {
  const { user } = req.cookies;

  if (user) {
    res.clearCookie("user");
    res.json({ message: "Logout realizado com sucesso" });
    return;
  }

  res.status(400).json({ message: "Usuário não encontrado" });
  return;
}