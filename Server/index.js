//* used to load environment variables from .env file
require("dotenv").config();

//*import express
const express = require("express");
const cors = require("cors")

const cookieParser = require("cookie-parser");

const path = require("path");

//*refers to connection.js
const connectMongoDb = require("./database/connection");

//*refers to server specific to routes
const userRoute = require("./routes/userRoutes.js");
const blogRoute = require("./routes/blogRoutes.js");

//*initialize app
const app = express();

//*middlewares

//*refers to connection.js
connectMongoDb(process.env.MongoURI);

const PORT = process.env.PORT || 5000;

const allowedOrigins = ['http://localhost:5173'];

const corsOptions = {
  origin: 'http://localhost:5173', // Replace this with your frontend domain
  credentials: true, // Allow cookies to be included in requests
};

app.use(cors(corsOptions));

app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser());
app.use("/", userRoute);
app.use("/blog", blogRoute);


//*sample test
app.get("/", (req, res) => {
  res.send("Hello");
});

app.listen(PORT, () => {
  console.log("Listening...");
});