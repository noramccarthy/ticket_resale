const mongoose = require('mongoose')

const StateSchema = new mongoose.Schema({
    stateName:{
        type:String,
        required:[true,"State is required!"]
    }
}, {timestamps:true});

const State = mongoose.model("State", StateSchema);
module.exports = State;