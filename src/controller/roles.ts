import { Request, Response } from "express";
import prisma from "../prismaClient";

// list all roles & their permissions
export const listRoles = async (request: Request, response: Response) => {
  const roles = await prisma.role.findMany();
  response.json(roles);
};

export const createRole = async (request: Request, response: Response) => {
  const { name, permissions } = request.body;
  await prisma.role.create({
    data: {
      name: request.body.name,
      permissions: {
        connect: request.body.permissions.map((permission: string) => ({
          name: permission,
        })),
      },
    },
  });
  response.send("Role created successfully");
};
