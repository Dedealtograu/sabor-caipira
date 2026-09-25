import "dotenv/config";
import express from "express";
import { connection } from "./src/db";
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

connection();

const PORT = 3000;

app.listen(PORT, async () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});