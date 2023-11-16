import { useState } from 'react';
import axios from 'axios';
import { MessageList, Message, ConversationHeader, MessageSeparator, MessageInput, TypingIndicator, MainContainer, ChatContainer } from '@chatscope/chat-ui-kit-react';
import '@chatscope/chat-ui-kit-styles/dist/default/styles.min.css';
import '../css/Chatbot.css'

const Chatbot = () => {
    const [isOpen, setIsOpen] = useState(true);
    const [messages, setMessages] = useState([
        {
        message: "Hello, I'm ChatGPT! Ask me anything!",
        sentTime: "just now",
        sender: "ChatGPT"
        }
    ]);
    const [isTyping, setIsTyping] = useState(false);

    const toggle = () => {
        setIsOpen((isOpen) => !isOpen)
    }

    const handleSend = async (message) => {

        // const result = await openai.chat.completions.create({
        //     model: "gpt-3.5-turbo-1106",
        //     messages: chats
        // })
        // console.log("Results", result.choices[0].message)
        // res.json(result.choices[0].message)
        
        const newMessage = {
            message,
            direction: 'outgoing',
            sender: "user"
        };
        console.log("newMessage:", newMessage)

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
        console.log("apiMessages:", apiMessages)

        await axios.post("http://localhost:8000/api/chat", apiMessages)
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