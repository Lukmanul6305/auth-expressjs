const express = require("express");
const app = express();
const PORT = 3000;
app.use(express.json());
const db = require("./config/connection");


const users = require("./routes/usersRoutes");

app.use("/user", users);

app.listen(PORT, () => {
  console.log(`server running port ${PORT}`);
});
