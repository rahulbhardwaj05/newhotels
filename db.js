const mongoose = require("mongoose");
require('dotenv').config()

// Define the mongoDB connection  url
// const mongoUrl = process.env.MONGODB_URL_LOCAL
const mongoUrl = process.env.MONGODB_URL

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
