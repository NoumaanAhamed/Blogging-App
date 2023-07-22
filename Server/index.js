//* used to load environment variables from .env file
require("dotenv").config();

//*import express
const express = require("express");

const cookieParser = require("cookie-parser");

const path = require("path");

const cors = require("cors");
//*refers to connection.js
const connectMongoDb = require("./database/connection");

//*refers to server specific to routes
const userRoute = require("./routes/userRoutes.js");
const blogRoute = require("./routes/blogRoutes.js");

//*initialize app
const app = express();

//*middlewares
app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));
app.use(cookieParser());

app.use("/", userRoute);
app.use("/blog", blogRoute);

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
