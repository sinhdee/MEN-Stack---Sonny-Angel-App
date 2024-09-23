//Imports 
const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");

//Configurations 
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

//Import Mongoose Model
const sonnyangel = require("./models/sonnyangel")

//Middleware 
const methodOverride = require("method-override");
const morgan = require("morgan");

app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use(methodOverride('_method'))

//Connection 
mongoose.connect(process.env.MONGODB_URI);

//Configure View Engine 
app.set("view engine","ejs");
//Routes 

//Landing Page
app.get("/", (req, res) => {
    res.render("index");
  });

//Render a new page 
app.get("/sonnyangels/new", (req, res) => {
    res.render("sonnyangels/new");
  });

//SHOW ROUTE 
app.get("/sonnyangels/:id", async (req, res) => {
  try {
    const foundSonnyAngel = await sonnyangel.findById(req.params.id);
    const contextData = { sonnyangel: foundSonnyAngel };
    res.render("sonnyangels/show", contextData);
  } catch (err) {
    console.log(err);
    res.redirect("/");
  }
});

//INDEX GET
app.get("/sonnyangels", async (req, res) => {
  try {
    const allSonnyAngels = await sonnyangel.find();
    res.render("sonnyangels/index", { sonnyangels: allSonnyAngels, message: "All Your COOL Collected Babies" });
  } catch (err) {
    console.log(err);
    res.redirect("/");
  }
});
// POST /fruits
app.post("/sonnyangels", async (req, res) => {
  try {
    req.body.isPulled = req.body.isPulled === "on";
    const newSonnyAngel = await sonnyangel.create(req.body);
    res.redirect(`/sonnyangels/${newSonnyAngel._id}`);
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: err.message });
  }
});

//EDIT ROUTE
app.get("/sonnyangels/:sonnyangelId/edit", async (req, res) => {
  try {
    const sonnyangelToEdit = await sonnyangel.findById(req.params.sonnyangelId);
    res.render("sonnyangels/edit", { sonnyangel: sonnyangelToEdit });
  } catch (err) {
    console.log(err);
    res.redirect(`/`);
  }
});

//UPDATE ROUTE

app.put("/sonnyangels/:id", async (req, res) => {
  try {
    if (req.body.isPulled === "on") {
      req.body.isPulled = true;
    } else {
      req.body.isPulled = false;
    }

    await sonnyangel.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.redirect(`/sonnyangels/${req.params.id}`);
  } catch (err) {
    console.log(err);
    res.redirect(`/sonnyangels/${req.params.id}`);
  }
});

//app.listen 
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});