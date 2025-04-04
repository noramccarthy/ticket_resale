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

    // toggle chat window
    const toggle = () => {
        setIsOpen((isOpen) => !isOpen);
    }

    // handle sending a message from the user
    const handleSend = async (message) => {
        const newMessage = {
            message,
            direction: 'outgoing',
            sender: "user"
        };
        console.log("newMessage:", newMessage)

        // update the message state with the new user message
        const newMessages = [...messages, newMessage];
        setMessages(newMessages);
        setIsTyping(true);

        // send message to backend to get response from openai
        await processMessageToOpenAI(newMessages);
    };

    // send user's message to backend
    const processMessageToOpenAI = async (chatMessages) => {
        const userMessage = chatMessages[chatMessages.length - 1].message; // last sent msg


        // // Format messages for OpenAI API
        // let apiMessages = chatMessages.map((messageObject) => {
        //     let role = messageObject.sender === 'OpenAI' ? 'assistant' : 'user';
        //     return { role, content: messageObject.message };
        // });
        // console.log("apiMessages:", apiMessages)


        try {
            const response = await axios.post(
                'http://localhost:8000/api/chat',
                { message: userMessage }
            );
            const assistantMessage = response.data.message;

            // update message list with assistant's response
            setMessages([...chatMessages, { message: assistantMessage, sender: 'OpenAI' }]);
            setIsTyping(false);
        } catch (error) {
            console.error('Error in API request:', error);
            setIsTyping(false);
        }
    }
    
    return (
        (isOpen ? <MainContainer responsive>                
            <ChatContainer>
                <ConversationHeader>
                    <ConversationHeader.Back />
                    <ConversationHeader.Content userName="Virtual Assistant" info="Active" />
                    <ConversationHeader.Actions>
                        {/* <EllipsisButton orientation="vertical" /> */}
                        <button type="button" className='btn-close chatbot-toggle-button' onClick={toggle}></button>
                    </ConversationHeader.Actions>
                </ConversationHeader>

                <MessageList scrollBehavior="smooth" typingIndicator={isTyping ? <TypingIndicator/> : null}>
                    <MessageSeparator content="Today" />
                        {messages.map((message, i) => {
                            return <Message key={i} model={message} />
                        })}
                </MessageList>
                <MessageInput placeholder="Type message here..." onSend={handleSend} />
            </ChatContainer>
        </MainContainer>
        : "")
        
    )
}

export default Chatbot;