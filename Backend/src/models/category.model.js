const mongoose = require("mongoose");

const categoryModel = new mongoose.Schema({
    name : {
        type : String,
        required : true,
        unique : true,
        trim : true
    }
})

module.exports = mongoose.model("category", categoryModel);