import { faker } from "@faker-js/faker";
import prisma from "../prismaClient";

const populateOrders = async () => {
  const products = await prisma.product.findMany();
  const orders = new Array(30).fill(null).map(() => {
    const orderProducts = faker.helpers.arrayElements(products, {
      min: 1,
      max: 5,
    });
    const total = orderProducts.reduce(
      (acc, products) => acc + products.price,
      0
    );

    return {
      email: faker.internet.email(),
      name: faker.person.fullName(),
      total: total,
      products: orderProducts,
    };
  });

  console.log(`Populating ${orders.length} orders`, orders);

  for (const order of orders) {
    await prisma.order.create({
      data: {
        email: order.email,
        name: order.name,
        total: order.total,
        products: {
          connect: order.products.map((product) => ({ id: product.id })),
        },
      },
    });
  }

  console.log("Orders populated successfully");
};

populateOrders();
