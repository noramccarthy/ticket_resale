import { useState } from 'react';
import axios from 'axios';
import { MainContainer, ChatContainer, MessageList, Message, MessageInput, TypingIndicator } from '@chatscope/chat-ui-kit-react';
import '../css/Chatbot.css';

const Chatbot = () => {

    const [messages, setMessages] = useState([
        {
        message: "Hello, I'm ChatGPT! Ask me anything!",
        sentTime: "just now",
        sender: "ChatGPT"
        }
    ]);
    const [isTyping, setIsTyping] = useState(false);

    const handleSend = async (message) => {
        const newMessage = {
            message,
            direction: 'outgoing',
            sender: "user"
        };
        console.log(newMessage)

        const newMessages = [...messages, newMessage];
        
        setMessages(newMessages);
        setIsTyping(true);
        await processMessageToChatGPT(newMessages);
    };

    const processMessageToChatGPT = async (chatMessages) => {
        // Format messages for chatGPT API
        // API is expecting objects in format of { role: "user" or "assistant", "content": "message here"}
        let apiMessages = chatMessages.map((messageObject) => {
            let role = "";
            if (messageObject.sender === "ChatGPT") {
                role = "assistant";
            } else {
                role = "user";
            }
            return { role: role, content: messageObject.message}
        });
        console.log(apiMessages)

        await axios.post("http://localhost:8000/chat", apiMessages)
        .then(res => {
            console.log("RESULTS!", res.data);

            setMessages([...chatMessages, {
                message: res.data,
                sender: "ChatGPT"
            }]);

            setIsTyping(false);
        });
    }
    
    return (
        <div className="App">
            <div style={{ position:"relative", height: "800px", width: "700px"  }}>
                <MainContainer>
                    <ChatContainer>       
                        <MessageList 
                        scrollBehavior="smooth" 
                        typingIndicator={isTyping ? <TypingIndicator content="ChatGPT is typing..." /> : null}
                        >
                        {messages.map((message, i) => {
                            return <Message key={i} model={message} />
                        })}
                        </MessageList>
                        <MessageInput placeholder="Type message here" onSend={handleSend} />        
                    </ChatContainer>
                </MainContainer>
            </div>
        </div>
    )
}

export default Chatbot;