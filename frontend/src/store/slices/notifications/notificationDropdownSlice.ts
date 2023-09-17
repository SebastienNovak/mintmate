import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type Notification = {
    id: number; 
    message: string; 
    read: boolean; 
};

type NotificationDropdownState = {
    notifications: Notification[];
    unreadCount: number;
    isOpen: boolean;
};

const initialState: NotificationDropdownState = {
    notifications: [],
    unreadCount: 0,
    isOpen: false
};

const notificationDropdownSlice = createSlice({
    name: 'notificationDropdown',
    initialState,
    reducers: {
        addNotification: (state, action: PayloadAction<Notification>) => {
            state.notifications.push(action.payload);
            if (!action.payload.read) {
                state.unreadCount += 1;
            }
        },
        markAsRead: (state, action: PayloadAction<number>) => { // Using id as payload to identify the notification
            const notification = state.notifications.find(n => n.id === action.payload);
            if (notification && !notification.read) {
                notification.read = true;
                state.unreadCount -= 1;
            }
        },
        toggleDropdown: (state) => {
            state.isOpen = !state.isOpen;
        },
        clearNotifications: (state) => {
            state.notifications = [];
            state.unreadCount = 0;
        }
    }
});

export const {
    addNotification,
    markAsRead,
    toggleDropdown,
    clearNotifications
} = notificationDropdownSlice.actions;

// Selectors
type RootState = {
    notificationDropdown: NotificationDropdownState;
};

export const selectNotifications = (state: RootState) => state.notificationDropdown.notifications;
export const selectUnreadCount = (state: RootState) => state.notificationDropdown.unreadCount;
export const selectDropdownState = (state: RootState) => state.notificationDropdown.isOpen;

export default notificationDropdownSlice.reducer;
