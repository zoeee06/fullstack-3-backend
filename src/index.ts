import express from "express";
import rolesRouter from "./routes/roles";
import usersRouter from "./routes/users";
import authRouter from "./routes/auth";
import productsRouter from "./routes/products";
import orderRouter from "./routes/order";
import { authentication } from "./middlewares/authentication";

const app = express();
const bodyParser = require("body-parser");

app.use(bodyParser.json());
app.use(authentication);
// list all roles & their permissions
app.use(rolesRouter);
app.use(usersRouter);
app.use(authRouter);

app.use(productsRouter);
app.use(orderRouter);

app.listen(8888, () => {
  console.log("Server is running on port 8888");
});
