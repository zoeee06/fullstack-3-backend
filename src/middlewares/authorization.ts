import { Request, Response, NextFunction } from "express";
import prisma from "../prismaClient";

export const authorization = (targetPermissions: string[]) => {
  return async (request: Request, response: Response, next: NextFunction) => {
    const userId = (request as any).userId;
    console.log("userId", userId);
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
      include: {
        role: {
          include: {
            permissions: true,
          },
        },
      },
    });
    console.log("user", user?.role.permissions);

    const userPermissions = user?.role.permissions.map(
      (permission) => permission.name
    );

    const hasValidPermission = userPermissions?.some((p) =>
      targetPermissions.includes(p)
    );

    if (!hasValidPermission) {
      response.status(403).send("Forbidden");
      return;
    }

    console.log("hasValidPermission", hasValidPermission);
    next();
  };
};
