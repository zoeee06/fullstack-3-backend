import express from "express";
import rolesRouter from "./routes/roles";
import usersRouter from "./routes/users";

const app = express();
const bodyParser = require("body-parser");

app.use(bodyParser.json());

// list all roles & their permissions
app.use(rolesRouter);
app.use(usersRouter);

app.listen(8888, () => {
  console.log("Server is running on port 8888");
});
