const mongoose = require("mongoose");

// Define the mongoDB connection  url
const mongoUrl = "mongodb://127.0.0.1:27017/hotels";

// setup mongoDB connection
mongoose.connect(mongoUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

//get the deafult connection
const db = mongoose.connection;

db.on("connected", () => {
  console.log("connected to mongoDB server");
});

db.on("error", (err) => {
  console.log(" mongoDBconnection error:", err);
});

db.on("disconnected", () => {
  console.log("mongoDB disconnected");
});

// export the database connection

module.exports = db;
