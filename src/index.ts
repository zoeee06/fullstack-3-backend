import express from "express";

const app = express();

app.get("/", (request, response) => {
  console.log("Got request");
  response.send("I got your request");
});

app.listen(8888, () => {
  console.log("Server is running on port 8888");
});
