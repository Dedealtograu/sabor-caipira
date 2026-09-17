import express from "express";
import { connectToDatabase } from "./src/prisma/db";
import "dotenv/config";
import cors from "cors";
import { router } from "./src/router.ts";

const app = express();

app.use(cors());
app.use(express.json());

app.use(router);

const PORT = 3000;

app.listen(PORT, async () => {
  console.log(`Servidor rodando na porta ${PORT}`);
  await connectToDatabase();
});