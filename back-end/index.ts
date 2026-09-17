import express, { Request, Response } from "express";
import { connectToDatabase, db } from "./src/prisma/db";
import "dotenv/config";
import cors from "cors";
import bcrypt from "bcrypt";

const app = express();

app.use(cors());

app.use(express.json());

const PORT = 3000;

app.post("/login", async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "E-mail e senha são obrigatórios" });
    }

    const user = await db.orm.public.User.select("id", "name", "email", "password", "admin", "mission").where({ email }).first()

    if (!user) {
      return res.status(404).json({ message: "Usuário não encontrado" });
    }

    const match = await bcrypt.compare(password, user?.password);

    if (!match) {
      return res.status(401).json({ message: "E-mail ou senha inválidos" });
    }

    const { password: _, ...userWithoutPassword } = user;

    res.status(200).json({ user: userWithoutPassword });
  } catch (error) {
    console.error("Erro ao fazer login:", error);
    res.status(500).json({ message: "Erro interno do servidor" });
  }
});

app.post("/register", async (req: Request, res: Response) => {
  try {
    const { name, email, password, mission } = req.body;

    if (!name || !email || !password || !mission) {
      return res.status(400).json({ message: "Todos os campos são obrigatórios" });
    }

    const user = await db.orm.public.User.select("id", "name", "email", "admin", "mission").where({ email }).first()

    if (user?.email) {
      return res.status(409).json({ message: "Usuário já cadastrado" });
    }

    const hash = await bcrypt.hash(password, 10);

    const newUser = await db.orm.public.User.create({ email, name, password: hash, mission })

    res.status(201).json({ newUser });
  } catch (error) {
    console.error("Erro ao registrar usuário:", error);
    res.status(500).json({ message: "Erro interno do servidor" });
    return
  }
});

app.listen(PORT, async () => {
  console.log(`Servidor rodando na porta ${PORT}`);
  await connectToDatabase();
});