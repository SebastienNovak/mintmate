import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type UserProfile = {
    username: string;
    email: string;
    profilePictureUrl: string;
    joinDate: string;
    bio: string;
};

type UserActivity = {
    id: string;
    type: 'song' | 'playlist' | 'comment';
    contentTitle: string;
    date: string;
    thumbnailUrl: string;
};

type UserNotification = {
    id: string;
    message: string;
    date: string;
    read: boolean;
};

type UserDashboardState = {
    userProfile: UserProfile | null;
    userActivities: UserActivity[];
    notifications: UserNotification[];
    loading: boolean;
    error: string | null;
};

const initialState: UserDashboardState = {
    userProfile: null,
    userActivities: [],
    notifications: [],
    loading: false,
    error: null,
};

const userDashboardSlice = createSlice({
    name: 'userDashboard',
    initialState,
    reducers: {
        fetchUserDataStart: (state) => {
            state.loading = true;
            state.error = null;
        },
        fetchUserDataSuccess: (state, action: PayloadAction<{ userProfile: UserProfile, userActivities: UserActivity[], notifications: UserNotification[] }>) => {
            state.userProfile = action.payload.userProfile;
            state.userActivities = action.payload.userActivities;
            state.notifications = action.payload.notifications;
            state.loading = false;
        },
        fetchUserDataFailure: (state, action: PayloadAction<string>) => {
            state.loading = false;
            state.error = action.payload;
        },
        markUserNotificationAsRead: (state, action: PayloadAction<string>) => {
            const notification = state.notifications.find(n => n.id === action.payload);
            if (notification) notification.read = true;
        },
        resetUserDashboardState: (state) => {
            Object.assign(state, initialState);
        },
    }
});

export const {
    fetchUserDataStart,
    fetchUserDataSuccess,
    fetchUserDataFailure,
    markUserNotificationAsRead,
    resetUserDashboardState
} = userDashboardSlice.actions;

// Selectors
type RootState = {
    userDashboard: UserDashboardState;
};

export const selectUserProfile = (state: RootState) => state.userDashboard.userProfile;
export const selectUserActivities = (state: RootState) => state.userDashboard.userActivities;
export const selectUserNotifications = (state: RootState) => state.userDashboard.notifications;
export const selectUserDashboardLoading = (state: RootState) => state.userDashboard.loading;
export const selectUserDashboardError = (state: RootState) => state.userDashboard.error;

export default userDashboardSlice.reducer;
