import { faker } from "@faker-js/faker";
import prisma from "../prismaClient";

const populateProducts = async () => {
  const products = new Array(30).fill(null).map(() => {
    return {
      title: faker.commerce.productName(),
      description: faker.commerce.productDescription(),
      price: Number(faker.commerce.price()),
    };
  });

  console.log(`Populating ${products.length} products`, products);

  await prisma.product.createMany({
    data: products,
  });
};

populateProducts();
