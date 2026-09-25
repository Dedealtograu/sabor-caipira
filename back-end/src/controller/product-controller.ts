import type { Request, Response } from "express";
import { db } from "../prisma/db";

export const getProducts = async (req: Request, res: Response) => {
  try {
    const products = await db.orm.public.Product.select("id", "name", "description", "price", "category", "image").all();

    if (products.length === 0) {
      return res.status(404).json({ message: "Nenhum produto encontrado" });
    }

    return res.status(200).json(products);
  } catch (error) {
    console.error("Erro ao buscar produtos:", error);
    return res.status(500).json({ message: "Erro interno do servidor" });
  }
}

export const deleteProduct = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ message: "Id não fornecido" });
    }

    const deleteProduct = await db.orm.public.Product.where({ id: String(id) }).delete();

    if (!deleteProduct) {
      return res.status(404).json({ message: "Erro ao deletar Produto" });
    }

    res.json(deleteProduct);
  } catch (error) {
    console.error("Erro ao deletar produto:", error);
    return res.status(500).json({ message: "Erro interno do servidor" });
  }
}