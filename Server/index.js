//* used to load environment variables from .env file
require("dotenv").config();

//*import express
const express = require("express");

//*refers to connection.js
const connectMongoDb = require("./connection.js");

//*refers to server specific to routes
const userRoute = require("./routes/userRoutes.js");

//*initialize app
const app = express();

//*middlewares
app.use(express.json());
app.use("/", userRoute);

//*refers to connection.js
connectMongoDb(process.env.MongoURI);

const PORT = process.env.PORT || 5000;

//*sample test
app.get("/", (req, res) => {
  res.send("Hello");
});

app.listen(PORT, () => {
  console.log("Listening...");
});
