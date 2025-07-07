import { Request, Response } from "express";
import prisma from "../prismaClient";

// Create a new order
export const createOrder = async (req: Request, res: Response) => {
  try {
    const { email, name, total, productIds } = req.body;
    if (!Array.isArray(productIds) || productIds.length === 0) {
      res.status(400).json({ error: "productIds must be a non-empty array" });
      return;
    }
    const order = await prisma.order.create({
      data: {
        email,
        name,
        total,
        products: {
          connect: productIds.map((id: number) => ({ id })),
        },
      },
      include: {
        products: true,
      },
    });
    res.status(201).json(order);
  } catch (error) {
    res.status(500).json({ error: "Failed to create order", details: error });
  }
};

// Get order by id
export const getOrderById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const order = await prisma.order.findUnique({
      where: { id: Number(id) },
      include: { products: true },
    });
    if (!order) {
      res.status(404).json({ error: "Order not found" });
      return;
    }
    res.json(order);
  } catch (error) {
    res.status(500).json({ error: "Failed to get order", details: error });
  }
};

// List all orders
export const listOrders = async (_req: Request, res: Response) => {
  try {
    const orders = await prisma.order.findMany({
      include: { products: true },
      orderBy: { createdAt: "desc" },
    });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: "Failed to list orders", details: error });
  }
};
