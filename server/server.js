const dotenv = require('dotenv');
dotenv.config();

const express = require("express");
const app = express();
const cors = require("cors");
const cookieParser = require("cookie-parser");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

const allowedOrigins = ["http://localhost:3000", "http://3.148.106.111"];

app.use(cors({
    origin: function (origin, callback) {
        if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
        } else {
        callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true
    }));

require("./config/mongoose.config");
require("./routes/category.routes")(app);
require("./routes/chat.routes")(app);
require("./routes/paypal.routes")(app);
require("./routes/state.routes")(app);
require("./routes/ticket.routes")(app);
require("./routes/user.routes")(app);

// invoke the listen method on the express server
app.listen(8000, ()=>console.log("Listening on Port 8000"))