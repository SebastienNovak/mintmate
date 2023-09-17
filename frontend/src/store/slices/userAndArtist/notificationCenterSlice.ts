import { createSlice, PayloadAction, Dispatch } from '@reduxjs/toolkit';

// MOCK API UTILITY
const api = {
    fetchNotifications: async (): Promise<{ data: Notification[] }> => {
        // For simplicity, just returning mock data. Typically, you'd fetch from a backend.
        return {
            data: [
                {
                    id: '1',
                    content: 'You received a new message.',
                    isRead: false
                },
                // ... other notifications
            ]
        };
    },
    markAsRead: async (notificationId: string) => {
        // For simplicity, just returning an id. Typically, you'd update the backend.
        return notificationId;
    }
};

// Types
type Notification = {
    id: string;
    content: string;
    isRead: boolean;
};

// Initial State
const initialState: Notification[] = [];

// Slice
const notificationCenterSlice = createSlice({
    name: 'notificationCenter',
    initialState,
    reducers: {
        fetchNotificationsSuccess: (state, action: PayloadAction<Notification[]>) => {
            // Directly update the state using action.payload.
            state.length = 0; // This will clear the current state.
            state.push(...action.payload); // This will add the new notifications.
        },
        markNotificationAsRead: (state, action: PayloadAction<string>) => {
            const notification = state.find(n => n.id === action.payload);
            if (notification) {
                notification.isRead = true;
            }
        },
        clearAllNotifications: (state) => {
            // Directly clear the state.
            state.length = 0;
        }
    },
});


export const {
    fetchNotificationsSuccess,
    markNotificationAsRead,
    clearAllNotifications,
} = notificationCenterSlice.actions;

// Thunks
export const fetchUserNotifications = () => async (dispatch: Dispatch) => {
    try {
        const response = await api.fetchNotifications();
        dispatch(fetchNotificationsSuccess(response.data));
    } catch (error) {
        console.error('Error fetching notifications:', error);
        // Handle the error appropriately. Possibly dispatch a failure action.
    }
};

export const markAsRead = (notificationId: string) => async (dispatch: Dispatch) => {
    try {
        await api.markAsRead(notificationId);
        dispatch(markNotificationAsRead(notificationId));
    } catch (error) {
        console.error('Error marking notification as read:', error);
        // Handle the error appropriately. Possibly dispatch a failure action.
    }
};

// Selectors
type RootState = {
    notificationCenter: Notification[];
};

export const selectAllNotifications = (state: RootState) => state.notificationCenter;
export const selectUnreadNotifications = (state: RootState) => state.notificationCenter.filter(n => !n.isRead);

export default notificationCenterSlice.reducer;
