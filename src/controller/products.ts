import { Request, Response } from "express";
import prisma from "../prismaClient";

export const createProduct = async (request: Request, response: Response) => {
  const { title, description, price } = request.body;
  const product = await prisma.product.create({
    data: {
      title,
      description,
      price,
    },
  });

  response.status(201).json(product);
};

export const listProducts = async (request: Request, response: Response) => {
  const products = await prisma.product.findMany();
  response.json(products);
};

export const getProduct = async (request: Request, response: Response) => {
  const { id } = request.params;
  const product = await prisma.product.findUnique({
    where: { id: Number(id) },
  });
  response.json(product);
};
