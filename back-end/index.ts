import express from "express";
import { connectToDatabase } from "./src/prisma/db";
import "dotenv/config";
import cors from "cors";
import { router } from "./src/router.ts";
import cookieParser from "cookie-parser";

const app = express();

app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,
}));
app.use(express.json());
app.use(cookieParser());

app.use(router);

const PORT = 3000;

app.listen(PORT, async () => {
  console.log(`Servidor rodando na porta ${PORT}`);
  await connectToDatabase();
});