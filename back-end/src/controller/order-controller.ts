import type { Request, Response } from "express";
import { prisma } from "../db";

export const getOrderItems = async (req: Request, res: Response) => {
  try {
    const { user } = req;

    const orderItems = await prisma.orderItem.findMany({
      where: { userId: user.id },
      include: {
        product: true,
      },
    });
    return res.json(orderItems);
  } catch (error) {
    return res.status(500).json({ message: "Erro no servidor" })
  }
}

export const createOrderItem = async (req: Request, res: Response) => {
  try {
    const { user } = req;
    const { productId } = req.body;

    if (!productId) {
      return res.status(400).json({ message: "Produto não informado" });
    }

    const existsOrderItem = await prisma.orderItem.findFirst({
      where: {
        productId: productId,
        userId: user.id,
      },
    });

    let orderItem;

    if (existsOrderItem) {
      orderItem = await prisma.orderItem.update({
        where: {
          id: existsOrderItem.id,
        },
        data: {
          quantity: {
            increment: 1
          }
        },
      });
    } else {
      orderItem = await prisma.orderItem.create({
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

    const statusCode = orderItem.quantity === 1 ? 201 : 200;

    return res.status(statusCode).json(orderItem);
  } catch (error) {
    return res.status(500).json({ message: "Erro ao criar item do pedido." })
  }
}