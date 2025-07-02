import express from "express";
import prisma from "./prismaClient";

const app = express();

app.get("/", (request, response) => {
  console.log("Got request");
  response.send("I got your request");
});

// list all roles & their permissions
app.get("/roles", async (request, reponse) => {
  const roles = await prisma.role.findMany({
    include: {
      permissions: true,
    },
  });
  reponse.json(roles);
});

app.listen(8888, () => {
  console.log("Server is running on port 8888");
});
