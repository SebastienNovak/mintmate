import React, { useState, useCallback, useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    addMessage,
    setLastReadMessage,
    selectMessages,
    selectIsConnected,
    selectIsTyping,
    selectLastReadMessage
} from '../../store/slices/feedbackAndSupport/supportChatSlice'; // Update path accordingly
import { SupportChatMessage } from '../../store/slices/feedbackAndSupport/supportChatSlice';

const SupportChat: React.FC = () => {
    const dispatch = useDispatch();
    const messages = useSelector(selectMessages);
    const isConnected = useSelector(selectIsConnected);
    const isTyping = useSelector(selectIsTyping);
    const lastReadMessageId = useSelector(selectLastReadMessage);

    const [inputText, setInputText] = useState('');
    const messagesEndRef = useRef<HTMLDivElement | null>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(scrollToBottom, [messages]);

    const handleInputChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        setInputText(event.target.value);
    }, []);
    
    const handleSendMessage = useCallback(() => {
        if (inputText.trim()) {
            const newMessage: SupportChatMessage = {
                id: Date.now().toString(),
                sender: 'user',
                text: inputText,
                timestamp: new Date()
            };
    
            dispatch(addMessage(newMessage));
            dispatch(setLastReadMessage(newMessage.id)); 
            setInputText('');
        }
    }, [inputText, dispatch]);

    return (
        <div className="support-chat-container">
            <h2>Support Chat</h2>

            {isConnected ? <div>Connected</div> : <div>Not Connected</div>}
            {isTyping && <div>Support is typing...</div>}

            <div className="messages-list">
                {messages.map(message => (
                    <div key={message.id} className={`message ${message.sender}`}>
                        <span>{message.text}</span>
                        {lastReadMessageId === message.id && <span className="last-read">✓</span>}
                    </div>
                ))}
                <div ref={messagesEndRef}></div>
            </div>

            <div className="input-section">
                <input 
                    type="text" 
                    value={inputText} 
                    onChange={handleInputChange} 
                    placeholder="Type your message..."
                />
                <button onClick={handleSendMessage}>Send</button>
            </div>
        </div>
    );
};

export default SupportChat;
