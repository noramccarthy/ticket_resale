// ES5 syntax
const useLoadScript = require('@react-google-maps/api')
const OpenAI  = require("openai")
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
// require routes
require("./routes/category.routes")(app);
require("./routes/chat.routes")(app);
require("./routes/paypal.routes")(app);
require("./routes/state.routes")(app);
require("./routes/ticket.routes")(app);
require("./routes/user.routes")(app);

// endpoints for PayPal
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

app.post("/api/load", (req, res) => {
    try {
        useLoadScript({
            googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY
        })
    } catch(err) {
        console.log(err)
    }
})

// endpoint for ChatGPT
// const openai = new OpenAI({
//     apiKey: process.env.OPENAI_API_KEY
// });
// console.log(process.env.REACT_APP_OPENAPI_KEY)
// console.log("Key", process.env.REACT_APP_OPENAPI_KEY)

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY // defaults to process.env["OPENAI_API_KEY"]
});
console.log("KEY", process.env.OPENAI_API_KEY)

app.post("/api/chat", async (req, res) => {
    const chats = req.body;

        try {
            const assistant = await openai.beta.assistants.create({
                instructions:
                "You are customer support for a website called Ticket Forum.",
                name: "Customer Support",
                tools: [{ type: "code_interpreter" }],
                model: "gpt-3.5-turbo-1106"
            });
            console.log("Assistant:", assistant)

            // create a thread
            const thread = await openai.beta.threads.create();

            // add a message to a thread
            await openai.beta.threads.messages.create(thread.id, {
                role: "user",
                content: JSON.stringify(chats),
            })
            // console.log("Thread messages:", threadMessages)

            // run the assistant
            const run = await openai.beta.threads.runs.create(thread.id, {
                assistant_id: assistant.id
            });
            console.log("Assistant ID:", assistant.id)

            // list runs
            const runs = await openai.beta.threads.runs.list(thread.id)
            console.log("Runs:", runs)

            // submit tool outputs to run
            // const runTool = await openai.beta.threads.runs.submitToolOutputs(thread.id, run.id, {
            //     tool_outputs: [
            //         {
            //             tool_call_id: toolCall?.id,
            //             output: JSON.stringify(responses)
            //         }
            //     ]
            // })
            // console.log(runTool)

            let runStatus = await openai.beta.threads.runs.retrieve(thread.id, run.id,)

            // polling for run completion
            while (runStatus.status != "completed") {
                await new Promise(resolve => setTimeout(resolve, 1000));
                runStatus = await openai.beta.threads.runs.retrieve(thread.id, run.id,)
            }
            console.log("Run status:", runStatus)

            // retrieve the assistant's response after run is complete
            const messages = await openai.beta.threads.messages.list(thread.id);
            console.log("Messages:", messages.data)

            const aiMessages = messages.data.filter(msg => msg.role === 'assistant');

            // assuming the last message is the assistant's response
            const response = aiMessages[aiMessages.length-1].content[0].text.value;
            console.log(response)
            return res.json(response)

        } catch (error) {
            console.log("Error:", error);
            res.status(500).json({
                error: "An error occured with chatGPT request:", error
            })
        }
    }
)

// invoke the listen method on the express server
app.listen(8000, ()=>console.log("Listening on Port 8000"))