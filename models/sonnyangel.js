
const mongoose = require('mongoose')

// define a schema for all sonny angels documents
const SonnyAngelsSchema = new mongoose.Schema({
    name: String, 
    isPulled: Boolean,
}) 


const sonnyangel = mongoose.model("SonnyAngel", SonnyAngelsSchema)

// export the model object 
module.exports = mongoose.model("SonnyAngel",SonnyAngelsSchema);