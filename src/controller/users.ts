import { Request, Response } from "express";
import prisma from "../prismaClient";
import bcrypt from "bcrypt";

// list all users
export const listUsers = async (request: Request, response: Response) => {
  const users = await prisma.user.findMany({
    include: {
      role: true,
    },
  });
  response.json(users);
};

export const createUser = async (request: Request, response: Response) => {
  const { name, email, password, roleId } = request.body;
  await prisma.user.create({
    data: {
      name: name,
      email: email,
      role: {
        connect: {
          id: roleId,
        },
      },
      password: {
        create: {
          hash: bcrypt.hashSync(password, 10),
        },
      },
    },
  });
  response.send("User created successfully");
};
