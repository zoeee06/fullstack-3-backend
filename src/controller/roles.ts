// import { Request, Response } from "express";
// import prisma from "../prismaClient";

// export const listRoles = async (request: Request, response: Response) => {
//   const roles = await prisma.role.findMany();
//   response.json(roles);
// };

// export const createRole = async (request: Request, response: Response) => {
//   const { name } = request.body;
//   const role = await prisma.role.create({ data: { name } });
//   response.json(role);
// };
