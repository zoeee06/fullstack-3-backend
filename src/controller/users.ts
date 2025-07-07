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

export const getUser = async (request: Request, response: Response) => {
  const { id } = request.params;
  const user = await prisma.user.findUnique({
    where: {
      id: Number(id),
    },
  });

  if (!user) {
    response.status(404).send("User not found");
  }
  response.json(user);
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

export const deleteUser = async (request: Request, response: Response) => {
  const { id } = request.params;
  const user = await prisma.user.findUnique({
    where: {
      id: Number(id),
    },
  });

  if (!user) {
    response.status(404).send("User not found");
    return;
  }
  await prisma.user.delete({
    where: {
      id: Number(id),
    },
  });

  response.send("User deleted successfully");
};

export const updateUser = async (request: Request, response: Response) => {
  const { id } = request.params;

  const user = await prisma.user.findUnique({
    where: {
      id: Number(id),
    },
  });

  if (!user) {
    response.status(404).send("User not found");
    return;
  }

  await prisma.user.update({
    where: { id: Number(id) },
    data: {
      name: request.body.name || user.name,
      email: request.body.email || user.email,
      role: {
        connect: {
          id: request.body.roleId || user.role_id,
        },
      },
    },
  });
  response.json({ message: "User updated successfully" });
};
