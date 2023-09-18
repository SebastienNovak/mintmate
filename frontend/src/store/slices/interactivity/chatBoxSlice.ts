import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type Message = {
    id: string;
    text: string;
    timestamp: Date;
    sender: string;
};

type ChatState = {
    messages: Message[];
    activeUser: string; // the user currently using the chat
};

const initialState: ChatState = {
    messages: [],
    activeUser: ''
};

const chatBoxSlice = createSlice({
    name: 'chatBox',
    initialState,
    reducers: {
        addMessage: (state, action: PayloadAction<Message>) => {
            state.messages.push(action.payload);
        },
        setActiveUser: (state, action: PayloadAction<string>) => {
            state.activeUser = action.payload;
        },
        removeMessage: (state, action: PayloadAction<string>) => {
            state.messages = state.messages.filter(message => message.id !== action.payload);
        },
        clearMessages: (state) => {
            state.messages = [];
        }
    }
});

export const {
    addMessage,
    setActiveUser,
    removeMessage,
    clearMessages
} = chatBoxSlice.actions;

// Selectors
type RootState = {
    chatBox: ChatState;
};

export const selectAllMessages = (state: RootState) => state.chatBox.messages;
export const selectActiveUser = (state: RootState) => state.chatBox.activeUser;
export const selectMessagesFromUser = (state: RootState, username: string) => 
    state.chatBox.messages.filter(message => message.sender === username);

export default chatBoxSlice.reducer;
