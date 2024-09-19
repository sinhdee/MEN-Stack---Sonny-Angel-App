
const mongoose = require('mongoose')

// define a schema for all sonny angels documents
const SonnyAngelsSchema = new mongoose.Schema({
    // structure the keys / properties in our document
    name: String, 
    isPulled: Boolean,
}) 


const SonnyAngel = mongoose.model("SonnyAngel", SonnyAngelsSchemaSchema)

// export the model object 
module.exports = SonnyAngelsSchema