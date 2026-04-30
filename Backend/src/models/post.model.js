const mongoose  = require("mongoose");

const postSchema = new mongoose.Schema({
    image : String,
    caption : String, 
})

const postModel = mongoose.model("post" , postSchema); //post is the name of the collection in the database and postSchema is the schema for that collection. 

module.exports = postModel;  

