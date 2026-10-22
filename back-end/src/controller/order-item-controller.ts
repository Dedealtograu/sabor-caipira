import type { Request, Response } from "express";
import { prisma } from "../db";

export const getOrderItemByOrderId = async (req: Request, res: Response) => {
  try {
    const { orderId } = req.params

    if (!orderId) {
      return res.status(400).json({ message: "ID do pedido não fornecido" });
    }

    const orderItem = await prisma.orderItem.findMany({
      where: {
        orderId: String(orderId)
      },
      include: {
        product: true,
      }
    })

    const products = orderItem.map(item => {
      const { quantity } = item
      const { id, name, price } = item.product
      return { id, name, price, quantity }
    })
    return res.status(200).json(products)
  } catch (error) {
    console.error(error)
    return res.status(500).json({ message: "Erro ao buscar item do pedido" })
  }
}