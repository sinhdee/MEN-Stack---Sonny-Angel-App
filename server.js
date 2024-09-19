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

//Configure View Engine 
app.set("view engine","ejs");
//Routes 

//Landing Page
app.get("/sonnyangels", (req, res) => {
    res.render("index");
  });

//Render a new page 
app.get("/sonnyangels/new", (req, res) => {
    res.render("sonnyangels/new");
  });

//CREATE ROUTE - app.post 
app.post("/sonnyangels", async (req, res) => {
    if (req.body.isPulled) {
      req.body.isPulled = true;
    } else {
      req.body.isPulled = false;
    }
  
    try {
      await sonnyangel.create(req.body);
      res.redirect("/sonnyangels");
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  });


//app.listen 
app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
  });

  