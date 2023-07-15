const mongoose = require("mongoose");

function connectMongoDb(uri) {
  mongoose
    .connect(uri, {
      dbName: "Blog",
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log("Database Connected");
    })
    .catch((err) => {
      console.error("Error connecting to Database", err);
    });
}

module.exports = connectMongoDb;
