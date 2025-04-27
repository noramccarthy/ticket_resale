const mongoose = require("mongoose");

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(()=>console.log("Connected to DB"))
    .catch((err)=>console.log("Something went wrong when connection to the DB", err));