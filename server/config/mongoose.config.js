const mongoose = require("mongoose");



mongoose.connect("mongodb://127.0.0.1:27017/ticketResale", {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(()=>console.log("Connected to DB"))
    .catch((err)=>console.log("Something went wrong when connection to the DB", err));