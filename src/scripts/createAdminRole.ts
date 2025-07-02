import prisma from "../prismaClient";
import { PERMISSIONS } from "../constants";

const createAdminRole = async () => {
  await prisma.role.create({
    data: {
      name: "admin",
      permissions: {
        connect: [
          { name: PERMISSIONS.UESERS.READ },
          { name: PERMISSIONS.UESERS.EDIT },
          { name: PERMISSIONS.ROLES.READ },
          { name: PERMISSIONS.ROLES.EDIT },
          { name: PERMISSIONS.PRODUCTS.READ },
          { name: PERMISSIONS.PRODUCTS.EDIT },
          { name: PERMISSIONS.ORDERS.READ },
          { name: PERMISSIONS.ORDERS.EDIT },
        ],
      },
    },
  });
  console.log("Admin role created successfully");
};

createAdminRole();
