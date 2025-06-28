import prisma from "../prismaClient";

const createInitialPermissions = async () => {
  prisma.permission.createMany({
    data: [
      { name: "users:read" },
      { name: "users:edit" },
      { name: "roles:read" },
      { name: "roles:edit" },
      { name: "products:read" },
      { name: "products:edit" },
      { name: "orders:read" },
      { name: "orders:edit" },
    ],
  });
};

createInitialPermissions();
