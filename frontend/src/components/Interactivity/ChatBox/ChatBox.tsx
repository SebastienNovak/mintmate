import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    addMessage,
    setActiveUser,
    selectAllMessages,
    selectActiveUser,
    Message as MessageType
} from '../../../store/slices/interactivity/chatBoxSlice'; // Update path accordingly

const ChatBox: React.FC = () => {
    const [inputValue, setInputValue] = useState('');
    const [usernameInput, setUsernameInput] = useState('');
    const messagesEndRef = useRef<HTMLDivElement | null>(null);
    const dispatch = useDispatch();
    const messages = useSelector(selectAllMessages);
    const activeUser = useSelector(selectActiveUser);

    useEffect(() => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [messages]);

    const handleSendMessage = () => {
        if (inputValue.trim() !== '') {
            const newMessage: MessageType = {
                id: `${Date.now()}`, 
                text: inputValue,
                timestamp: new Date(),
                sender: activeUser
            };
            dispatch(addMessage(newMessage));
            setInputValue('');
        }
    };

    const handleSetUser = () => {
        dispatch(setActiveUser(usernameInput));
    };

    return (
        <div className="chat-box">
            <h2>ChatBox</h2>
            <div className="set-user-container">
                <input 
                    type="text" 
                    value={usernameInput} 
                    onChange={e => setUsernameInput(e.target.value)} 
                    placeholder="Set your username" 
                />
                <button onClick={handleSetUser}>Set User</button>
            </div>
            <div className="messages-container">
                {messages.map(message => (
                    <div key={message.id} className={`message ${message.sender === activeUser ? 'sent' : 'received'}`}>
                        <p>{message.text}</p>
                        <span>{message.timestamp.toLocaleTimeString()} - {message.sender}</span>
                    </div>
                ))}
                <div ref={messagesEndRef} />
            </div>
            <div className="input-container">
                <input
                    type="text"
                    value={inputValue}
                    onChange={e => setInputValue(e.target.value)}
                    onKeyPress={e => e.key === 'Enter' && handleSendMessage()}
                    placeholder="Type your message here..."
                />
                <button onClick={handleSendMessage}>Send</button>
            </div>
        </div>
    );
};

export default ChatBox;
