const express = require("express");
const app = express();
const db = require("./db");

require('dotenv').config()
const PORT = process.env.PORT || 3000

const bodyParser = require("body-parser");
app.use(bodyParser.json());


const menuItem = require("./models/menu.js");
const { method } = require("lodash");

app.get("/", function (req, res) {
  res.send("welcome to my hotel... How are you !");
});




const personRoutes = require('./routes/personRoutes.js')
app.use('/person', personRoutes)

const menuItemRoutes = require('./routes/menuRoutes.js')
app.use('/menu', menuItemRoutes)



app.listen(PORT, () => {
  console.log("listening on port 3000...");
});
