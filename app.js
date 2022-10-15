//REQUIREMENTS:
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const mongoose = require("mongoose");

//DOTENV:
require("dotenv/config");

//BODY PARSER:
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//IMPORT ROUTES:
const postRoutes = require("./routes/router");

//MIDDLEWARE
app.use("/", postRoutes);
app.use("/users", postRoutes);

//CONNECT TO DB
mongoose
  .connect(process.env.DB_CONNECTION, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB \n");
  })
  .catch((err) => {
    console.log("Error", err.message);
    process.exit();
  });

//Connection to Server
app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
