const express = require("express");
const app = express();
const cors = require("cors");

app.use(express.json());
app.use(cors());

const db = require("./models");

// Routers
const userRouter = require("./Routes/Users");
app.use("/Users", userRouter);

const customerRouter = require("./Routes/Customers.js");
app.use("/customers", customerRouter);

db.sequelize.sync().then(() => {
  app.listen(3001, () => {
    console.log("running on port 3001");
  });
});
