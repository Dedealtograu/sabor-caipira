import type { Request, Response } from "express";
import { prisma } from "../db";

export const getDeskItems = async (req: Request, res: Response) => {
  try {
    const { user } = req;

    if (!user) {
      return res.status(400).json({ message: "Usuário não informado" });
    }

    const deskItems = await prisma.deskItem.findMany({
      include: {
        product: true,
      },
    });
    return res.json(deskItems);
  } catch (error) {
    return res.status(500).json({ message: "Erro no servidor" })
  }
}

export const createDeskItem = async (req: Request, res: Response) => {
  try {
    const { user } = req;
    const { productId } = req.body;

    if (!productId) {
      return res.status(400).json({ message: "Produto não informado" });
    }

    const existsDeskItem = await prisma.deskItem.findFirst({
      where: {
        productId: productId,
        userId: user.id,
      },
    });

    let deskItem;

    if (existsDeskItem) {
      deskItem = await prisma.deskItem.update({
        where: {
          id: existsDeskItem.id,
        },
        data: {
          quantity: {
            increment: 1
          }
        },
      });
    } else {
      deskItem = await prisma.deskItem.create({
        data: {
          product: {
            connect: { id: productId },
          },
          user: {
            connect: { id: user.id },
          },
        },
      });
    }

    const statusCode = deskItem.quantity === 1 ? 201 : 200;

    return res.status(statusCode).json(deskItem);
  } catch (error) {
    return res.status(500).json({ message: "Erro ao criar item do pedido." })
  }
}

export const incrementQuantity = async (req: Request, res: Response) => {
  try {
    const { user } = req;
    const { id } = req.params;

    if (!user) {
      return res.status(400).json({ message: "Usuário não informado" });
    }

    if (!id) {
      return res.status(400).json({ message: "Id não informado" });
    }

    const deskItem = await prisma.deskItem.update({
      where: {
        id,
      },
      data: {
        quantity: {
          increment: 1
        }
      },
    });

    return res.json(deskItem);
  } catch (error) {
    return res.status(500).json({ message: "Erro ao atualizar item do pedido." })
  }
}

export const decrementQuantity = async (req: Request, res: Response) => {
  try {
    const { user } = req;
    const { id } = req.params;

    if (!user) {
      return res.status(400).json({ message: "Usuário não informado" });
    }

    if (!id) {
      return res.status(400).json({ message: "Id não informado" });
    }

    const deskItem = await prisma.deskItem.update({
      where: {
        id,
      },
      data: {
        quantity: {
          decrement: 1
        }
      },
    });

    return res.json(deskItem);
  } catch (error) {
    return res.status(500).json({ message: "Erro ao atualizar item do pedido." })
  }
}

export const deleteDeskItem = async (req: Request, res: Response) => {
  try {
    const { user } = req;
    const { id } = req.params;

    if (!user) {
      return res.status(400).json({ message: "Usuário não informado" });
    }

    if (!id) {
      return res.status(400).json({ message: "Id não informado" });
    }

    const deskItem = await prisma.deskItem.delete({
      where: {
        id,
      },
    });

    return res.json({ message: "Item removido com sucesso" });
  } catch (error) {
    return res.status(500).json({ message: "Erro ao remover item do pedido." })
  }
}