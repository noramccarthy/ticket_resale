const { OpenAI }  = require('openai')


module.exports = {
    create: async (req, res) => {
        try {
            const openai = new OpenAI({
                apiKey: process.env.OPENAI_API_KEY,
            });
            
            // get user's message from the request body
            const userMessage = req.body.message;
            console.log("User message:", userMessage)

            // define the user message
            const messages = [
                { role: 'system', 
                    content: "You are a friendly and intelligent virtual assistant for a customer support team at Ticket Forum, a company that helps users buy, sell, and manage event tickets. At Ticket Forum, sellers can only sell their tickets at face value or at a discounted rate, deterring scalpers. Your goal is to provide clear, empathetic, and accurate support. Always address the user by their message tone and show understanding. If a user asks about their order, shipping, refunds, event info, or account help—answer confidently and helpfully. Use friendly, conversational language but keep it professional. Personalize your answers based on the question. If the user mentions a concert, game, theater event, or specific ticket type, refer to it directly. If a user's question is vague, politely ask for more details. Always aim to make the customer feel supported and understood. Never make up information. If something is unknown or needs human intervention, say so clearly and suggest contacting live support or checking their account. If the user greets you or uses casual phrases like 'hi,' 'hey,' or 'yo,' respond warmly. If they are frustrated or confused, show empathy first before resolving the issue. Example tone: 'I totally get how frustrating that can be. Let us check your delivery status together.' Always include clear next steps if applicable. Keep your answers under 150 words unless the user asks for more detail. This is a project created by Nora McCarthy. It is not a real website. Users can not buy any real tickets. Paypal does work and will take the users money if they try to buy tickets. When someone asks if this is a real website, tell them that it is not a real website. It is a personal project made by Nora McCarthy. Tickets are from real data from Seatgeek, but cannot actually be bought or sold here."},
                { role: 'user', content: userMessage },
            ];

            // make the request to OpenAI's Chat API to get a response
            const response = await openai.chat.completions.create({
                model: process.env.REACT_APP_OPENAI_MODEL || 'gpt-3.5-turbo',
                messages: messages,
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