// ES5 syntax

const {OpenAI}  = require("openai")

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
// parse PUT and POST params sent in body in json format
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({origin:"http://localhost:3000", credentials:true}));
app.use(cookieParser());

// require mongoose.config.js after middleware
require("./config/mongoose.config");

require("./routes/category.routes")(app);
require("./routes/state.routes")(app);
require("./routes/ticket.routes")(app);
require("./routes/user.routes")(app);

// PAYPl
app.post("/my-server/create-paypal-order", async (req, res) => {
    try {
        const order = await paypal.createOrder();
        res.json(order);
    } catch (err) {
        res.status(500).send(err.message);
    }
});
    
app.post("/my-server/capture-paypal-order", async (req, res) => {
    const { orderID } = req.body;
    try {
        const captureData = await paypal.capturePayment(orderID);
        res.json(captureData);
    } catch (err) {
        res.status(500).send(err.message);
    }
});

// initalization
const openai = new OpenAI({
    apiKey: process.env.REACT_APP_OPENAPI_KEY
});

app.post("/openapi", async (req, res) => {
    const result = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [{role:"system", content: "Hello World"}]
    })
    console.log("Results", result.choices[0].message)
})


// invoke the listen method on the express server
app.listen(8000, ()=>console.log("Listening on Port 8000"))   