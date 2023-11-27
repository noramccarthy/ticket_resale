const OpenAI  = require("openai")


module.exports = {
    // create: async (req, res) => {

    //     const openai = new OpenAI({
    //         apiKey: process.env.OPENAI_API_KEY // defaults to process.env["OPENAI_API_KEY"]
    //     });

    //     console.log("REQ.BODY:", req.body)
    //     const chats = req.body;

    //     try {
    //         const assistant = await openai.beta.assistants.create({
    //             instructions:
    //             "You are customer support for a website called Ticket Forum.",
    //             name: "Customer Support",
    //             tools: [{ type: "code_interpreter" }],
    //             model: "gpt-3.5-turbo-1106"
    //         });
    //         console.log("Assistant:", assistant)

    //         // create a thread
    //         const thread = await openai.beta.threads.create();

    //         // add a message to a thread
    //         await openai.beta.threads.messages.create(thread.id, {
    //             role: "user",
    //             content: JSON.stringify(chats),
    //         })
    //         // console.log("Thread messages:", threadMessages)

    //         // run the assistant
    //         const run = await openai.beta.threads.runs.create(thread.id, {
    //             assistant_id: assistant.id
    //         });
    //         console.log("Assistant ID:", assistant.id)

    //         // list runs
    //         const runs = await openai.beta.threads.runs.list(thread.id)
    //         console.log("Runs:", runs)

    //         // submit tool outputs to run
    //         // const runTool = await openai.beta.threads.runs.submitToolOutputs(thread.id, run.id, {
    //         //     tool_outputs: [
    //         //         {
    //         //             tool_call_id: toolCall?.id,
    //         //             output: JSON.stringify(responses)
    //         //         }
    //         //     ]
    //         // })
    //         // console.log(runTool)

    //         let runStatus = await openai.beta.threads.runs.retrieve(thread.id, run.id,)

    //         // polling for run completion
    //         while (runStatus.status != "completed") {
    //             await new Promise(resolve => setTimeout(resolve, 1000));
    //             runStatus = await openai.beta.threads.runs.retrieve(thread.id, run.id,)
    //         }
    //         console.log("Run status:", runStatus)

    //         // retrieve the assistant's response after run is complete
    //         const messages = await openai.beta.threads.messages.list(thread.id);
    //         console.log("Messages:", messages.data)

    //         const aiMessages = messages.data.filter(msg => msg.role === 'assistant');

    //         // assuming the last message is the assistant's response
    //         const response = aiMessages[aiMessages.length-1].content[0].text.value;
    //         console.log(response)
    //         return res.json(response)

    //     } catch (error) {
    //         console.log("Error:", error);
    //         res.status(500).json({
    //             error: "An error occured with chatGPT request:", error
    //         })
    //     }
    // }
}