const express = require("express");
const app = express();

const crudRoute = require("./routes/crud");

app.use(express.json());
app.use("/todos", crudRoute);

app.listen(3001, () => {
  console.log("Server listening on post 3000");
});
