import type { Request, Response } from "express";
import { prisma } from "../db";

export const getProducts = async (req: Request, res: Response) => {
  try {
    const products = await prisma.product.findMany()

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
    const { user } = req;

    if (!user) {
      return res.status(400).json({ message: "Id não fornecido" });
    }

    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ message: "Id não fornecido" });
    }

    const deleteProduct = await prisma.product.delete({ where: { id: String(id) } })

    if (!deleteProduct) {
      return res.status(404).json({ message: "Erro ao deletar Produto" });
    }

    res.json({ id });
  } catch (error) {
    console.error("Erro ao deletar produto:", error);
    return res.status(500).json({ message: "Erro interno do servidor" });
  }
}