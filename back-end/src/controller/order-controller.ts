import type { Request, Response } from "express";
import { prisma } from "../db";

export const createOrder = async (req: Request, res: Response) => {
  try {
    const { user } = req

    const { deskNumber } = req.body;

    if (!deskNumber) {
      return res.status(400).json({ message: "Número da mesa não fornecido" });
    }

    const deskItems = await prisma.deskItem.findMany({
      where: {
        userId: user.id,
      },
      include: {
        product: true,
      }
    })

    if (deskItems.length === 0) {
      return res.status(400).json({ message: "Nenhum item encontrado" });
    }

    let total = 0;

    for (let i = 0; i < deskItems.length; i++) {
      const item = deskItems[i]

      if (!item) continue;

      total += Number(item.product.price) * item.quantity;
    }

    const order = await prisma.order.create({
      data: {
        total: total,
        userId: user.id,
        deskNumber: Number(deskNumber),
        orderItems: {
          create: deskItems.map((item) => ({
            productId: item.productId,
            quantity: item.quantity,
            price: item.product.price
          }))
        }
      },
      include: {
        orderItems: true,

      }
    })

    await prisma.deskItem.deleteMany({
      where: {
        userId: user.id,
      },
    })

    return res.status(201).json(order)
  } catch (error) {
    console.error(error)
    return res.status(500).json({ message: "Erro ao criar pedido" })
  }
}

export const getAllOrders = async (req: Request, res: Response) => {
  try {
    const { user } = req

    const orders = await prisma.order.findMany({
      where: {
        userId: user.id
      },
      include: {
        orderItems: true,
      }
    })

    return res.status(200).json(orders)
  } catch (error) {
    console.error(error)
    return res.status(500).json({ message: "Erro ao buscar pedidos" })
  }
}

export const updateOrder = async (req: Request, res: Response) => {
  try {
    const { user } = req
    const { id } = req.params
    const { status } = req.body

    const order = await prisma.order.update({
      where: {
        id
      },
      data: {
        status: status,
      },
    })

    return res.status(200).json(order)
  } catch (error) {
    console.error(error)
    return res.status(500).json({ message: "Erro ao atualizar pedido" })
  }
}

export const getOrdersByDeskNumber = async (req: Request, res: Response) => {
  try {
    const { user } = req
    const { deskNumber } = req.body

    if (!deskNumber) {
      return res.status(400).json({ message: "Número da mesa não fornecido" });
    }

    const orders = await prisma.order.findMany({
      where: {
        deskNumber: Number(deskNumber),
        status: "entregue",
      }
    })

    if (orders.length === 0) {
      return res.status(404).json({ message: "Nenhum pedido encontrado" });
    }

    const orderItem = await Promise.all(orders.map(order => {
      return prisma.orderItem.findMany({
        where: {
          orderId: String(order.id)
        },
        include: {
          product: true,
        }
      })
    }))

    const products = orderItem.map(items => {
      return items.map(item => {
        const { quantity } = item
        const { id, name, price } = item.product
        return { id, name, price, quantity }
      })
    })

    const combinedProducts = products.reduce((acc, item) => {
      acc.push(...item)
      return acc
    }, [])

    const itemNames = combinedProducts.map(item => item.name)
    const uniqueItemNames = [...new Set(itemNames)]

    const uniqueProducts = uniqueItemNames.map(name => {
      const item = combinedProducts.find(item => item.name === name)
      return {
        id: item?.id,
        name: item?.name,
        price: item?.price,
        quantity: combinedProducts
          .filter(item => item.name === name)
          .reduce((acc, item) => acc + item.quantity, 0)
      }
    })

    return res.status(200).json(uniqueProducts)
  } catch (error) {
    console.error(error)
    return res.status(500).json({ message: "Erro ao buscar pedidos" })
  }
}

export const closeOrder = async (req: Request, res: Response) => {
  try {
    const { user } = req
    const { deskNumber } = req.body

    if (!deskNumber) {
      return res.status(400).json({ message: "Número da mesa não fornecido" });
    }

    const orders = await prisma.order.findMany({
      where: {
        deskNumber: Number(deskNumber),
        status: "entregue",
      }
    })

    await Promise.all(orders.map(order => {
      return prisma.order.update({
        where: {
          id: order.id
        },
        data: {
          status: "pago",
        },
      })
    }))

    return res.status(200).json(orders)
  } catch (error) {
    console.error(error)
    return res.status(500).json({ message: "Erro ao fechar pedido" })
  }
}