require("dotenv").config();

const express = require("express");

const connectMongoDb = require("./connection.js");

const userRoute = require("./routes/userRoutes.js");

const app = express();

app.use(express.json());

app.use("/", userRoute);

connectMongoDb(process.env.MongoURI);

const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.send("Hello");
});

app.listen(PORT, () => {
  console.log("Listening...");
});
