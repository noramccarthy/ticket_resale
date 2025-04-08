const { OpenAI }  = require('openai')
require('dotenv').config()

// Initialize the OpenAI client
const openai = new OpenAI({
    apiKey: process.env.REACT_APP_OPENAI_API_KEY,
});

module.exports = {
    create: async (req, res) => {
        try {
            // get user's message from the request body
            const userMessage = req.body.message;
            console.log("User message:", userMessage)

            // define the user message
            const messages = [
                { role: 'system', content: "You are a helpful virtual assistant for customer support on a website called Ticket Forum." },
                { role: 'user', content: userMessage },
            ];

            // make the request to OpenAI's Chat API to get a response
            const response = await openai.chat.completions.create({
                model: process.env.REACT_APP_OPENAI_MODEL || 'gpt-3.5-turbo',
                messages: [{ role: "system", content: "You are a helpful virtual assistant for customer support on a website called Ticket Forum." }], // define a system message to guide the assistant's behavior
                store: true,
                max_tokens: 150,
                temperature: 0.7, // adjust creativity of response; lower = more focused
            })

            console.log(response.choices[0].message.content);

            // extract the assistant's response from the API response
            const assistantReply = response?.choices?.[0]?.message?.content;
            
            if (!assistantReply) {
                throw new Error('No response from OpenAI');
            }

            console.log("Assistant's response:", assistantReply);

            // sent assistant's response back to the client
            return res.json({
                success: true,
                response: assistantReply,
            });
        } catch (error) {
            console.log("Error:", error);

            return res.status(500).json({
                error: "An error occured with OpenAI request:",
                details: error.message,
            })
        }
    }
}