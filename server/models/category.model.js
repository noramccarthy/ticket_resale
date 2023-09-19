const mongoose = require('mongoose')

const CategorySchema = new mongoose.Schema({
    categoryName:{
        type:String,
        required:[true,"Category name is required!"]
    },
    seatgeekName:{
        type:String,
        required:[true,"Seatgeek name is required!"]
    }
}, {timestamps:true});

const Category = mongoose.model("Category", CategorySchema);
module.exports = Category;