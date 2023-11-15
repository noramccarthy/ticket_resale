// ES5 syntax

const express = require("express");
const app = express();
const cors = require("cors");
const cookieParser = require("cookie-parser");
const port = 8000;

// require .env and invoke its config function
const dotenv = require('dotenv');
dotenv.config();

// require('dotenv').config({path:'.env'});


// middleware to properly read incoming data from the client's request object
// parse POST params sent in body in json format
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({origin:"http://localhost:3000", credentials:true}));
app.use(cookieParser());

// require mongoose.config.js after middleware
require("./config/mongoose.config");

// require routes
require("./routes/category.routes")(app);
require("./routes/state.routes")(app);
require("./routes/ticket.routes")(app);
require("./routes/user.routes")(app);
require("./routes/chat.routes")(app);
require("./routes/paypal.routes")(app);

// invoke the listen method on the express server
app.listen(8000, ()=>console.log("Listening on Port 8000"))   