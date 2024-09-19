//Imports 
const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");

//Configurations 
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

//Middleware 
const methodOverride = require("method-override");
const morgan = require("morgan");

//Connection 
mongoose.connect(process.env.MONGODB_URI);


//Routes 

app.get("/sonnyangels/new", (req, res) => {
    res.render("sonnyangels/new");
  });
//app.listen 
app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
  });

  