import { useState } from 'react';
import axios from 'axios';
import { MessageList, Message, ConversationHeader, MessageSeparator, MessageInput, TypingIndicator, MainContainer, ChatContainer } from '@chatscope/chat-ui-kit-react';
import '@chatscope/chat-ui-kit-styles/dist/default/styles.min.css';
import '../css/Chatbot.css'

const Chatbot = () => {
    const [isOpen, setIsOpen] = useState(true);
    const [messages, setMessages] = useState([
        {
            message: "Hello, I'm a virtual assistant. Ask me question!",
            sentTime: "just now",
            sender: "OpenAI"
        }
    ]);
    const [isTyping, setIsTyping] = useState(false);

    const toggle = () => {
        setIsOpen((isOpen) => !isOpen);
    }

    const handleSend = async (message) => {
        const newMessage = {
            message,
            direction: 'outgoing',
            sender: "user"
        };
        console.log("New Message Received:", newMessage)

        // update the message state with the new user message
        setMessages((prevMessages) => [...prevMessages, newMessage]);
        setIsTyping(true);

        // send message to backend to get response from openai
        await processMessageToOpenAI([...messages, newMessage]);
    };

    // send user's message to backend
    const processMessageToOpenAI = async (chatMessages) => {
        const userMessage = chatMessages[chatMessages.length - 1].message; // send last msg

        try {
            const response = await axios.post(
                "http://localhost:8000/api/chat",
                // process.env.REACT_APP_API_URL || "http://localhost:8000/api/chat"
                { message: userMessage }
            );

            const assistantMessage = response.data.response;
            console.log("assistantMessage:", response)

            // update message list with assistant's response
            setMessages((prevMessages) => [
                ...prevMessages,
                { message: assistantMessage, sender: 'OpenAI'}
            ]);
            setIsTyping(false);
        } catch (error) {
            console.error('Error in API request:', error);
            setIsTyping(false);
        }
    }
    
    return (
        <div className="chatbot-wrapper">
            {/* Toggle button when collapsed */}
            {!isOpen && (
                <button className="chatbot-toggle-button-closed" onClick={toggle}>
                💬
                </button>
            )}
        
            {/* Chat UI when open */}
            {isOpen && (
                <MainContainer responsive className="chatbot-window">
                    <ChatContainer>
                        <ConversationHeader>
                            <ConversationHeader.Back />
                            <ConversationHeader.Content userName="Virtual Assistant" info="Active" />
                                <ConversationHeader.Actions>
                                    <button
                                    type="button"
                                    className="btn-close chatbot-toggle-button-open"
                                    onClick={toggle}
                                    />
                                </ConversationHeader.Actions>
                        </ConversationHeader>
            
                        <MessageList
                        scrollBehavior="smooth"
                        typingIndicator={isTyping ? <TypingIndicator /> : null}
                        >
                        <MessageSeparator content="Today" />
                        {messages.map((message, i) => {
                            const isUser = message.sender === 'user';
                            return (
                            <Message
                                key={i}
                                model={{
                                message: message.message,
                                sentTime: "just now",
                                sender: message.sender,
                                direction: isUser ? "outgoing" : "incoming",
                                position: "single"
                                }}
                            />
                            );
                        })}
                        </MessageList>
                        <MessageInput placeholder="Type your message..." onSend={handleSend} />
                    </ChatContainer>
                </MainContainer>
            )}
        </div>
    )
}

export default Chatbot;