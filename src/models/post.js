const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
    name: String,
    title: String,
    content: String,
    like: String
});



const Model = mongoose.model("postSchema", postSchema);
module.exports = Model;
