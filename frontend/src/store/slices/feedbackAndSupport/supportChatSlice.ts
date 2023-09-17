import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Define types
type Message = {
    id: string;
    sender: 'user' | 'support';
    text: string;
    timestamp: Date;
};

type SupportChatState = {
    messages: Message[];
    isConnected: boolean;
    isTyping: boolean;
    lastReadMessageId: string | null;
};

const initialState: SupportChatState = {
    messages: [],
    isConnected: false,
    isTyping: false,
    lastReadMessageId: null
};

const supportChatSlice = createSlice({
    name: 'supportChat',
    initialState,
    reducers: {
        addMessage: (state, action: PayloadAction<Message>) => {
            state.messages.push(action.payload);
        },
        setConnected: (state, action: PayloadAction<boolean>) => {
            state.isConnected = action.payload;
        },
        setTyping: (state, action: PayloadAction<boolean>) => {
            state.isTyping = action.payload;
        },
        setLastReadMessage: (state, action: PayloadAction<string>) => {
            state.lastReadMessageId = action.payload;
        },
        clearChat: (state) => {
            state.messages = [];
            state.lastReadMessageId = null;
        }
    }
});

export const {
    addMessage,
    setConnected,
    setTyping,
    setLastReadMessage,
    clearChat
} = supportChatSlice.actions;

// Selectors
type RootState = {
    supportChat: SupportChatState;
};

export const selectMessages = (state: RootState) => state.supportChat.messages;
export const selectIsConnected = (state: RootState) => state.supportChat.isConnected;
export const selectIsTyping = (state: RootState) => state.supportChat.isTyping;
export const selectLastReadMessage = (state: RootState) => state.supportChat.lastReadMessageId;

export default supportChatSlice.reducer;
