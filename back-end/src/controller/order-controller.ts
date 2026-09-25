import type { Request, Response } from "express";
import { prisma } from "../db";

export const getOrderItems = async (req: Request, res: Response) => {
  const orderItems = await prisma.orderItem.findMany({
    include: {
      user: true,
      product: true,
    },
  });
  return res.json(orderItems);
}