import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type ArtistProfile = {
    name: string;
    biography: string;
    avatarUrl: string;
    bannerUrl: string;
    followersCount: number;
    totalPlays: number;
};

type RecentActivity = {
    id: string;
    type: 'track' | 'album' | 'event';
    title: string;
    date: string;
    thumbnailUrl: string;
};

type Notification = {
    id: string;
    message: string;
    date: string;
    read: boolean;
};

type ArtistDashboardState = {
    artistProfile: ArtistProfile | null;
    recentActivities: RecentActivity[];
    notifications: Notification[];
    loading: boolean;
    error: string | null;
};

const initialState: ArtistDashboardState = {
    artistProfile: null,
    recentActivities: [],
    notifications: [],
    loading: false,
    error: null,
};

const artistDashboardSlice = createSlice({
    name: 'artistDashboard',
    initialState,
    reducers: {
        fetchDashboardDataStart: (state) => {
            state.loading = true;
            state.error = null;
        },
        fetchDashboardDataSuccess: (state, action: PayloadAction<{ artistProfile: ArtistProfile, recentActivities: RecentActivity[], notifications: Notification[] }>) => {
            state.artistProfile = action.payload.artistProfile;
            state.recentActivities = action.payload.recentActivities;
            state.notifications = action.payload.notifications;
            state.loading = false;
        },
        fetchDashboardDataFailure: (state, action: PayloadAction<string>) => {
            state.loading = false;
            state.error = action.payload;
        },
        markNotificationAsRead: (state, action: PayloadAction<string>) => {
            const notification = state.notifications.find(n => n.id === action.payload);
            if (notification) notification.read = true;
        },
        resetDashboardState: (state) => {
            Object.assign(state, initialState);
        },
    }
});

export const {
    fetchDashboardDataStart,
    fetchDashboardDataSuccess,
    fetchDashboardDataFailure,
    markNotificationAsRead,
    resetDashboardState
} = artistDashboardSlice.actions;

// Selectors
type RootState = {
    artistDashboard: ArtistDashboardState;
};

export const selectArtistProfile = (state: RootState) => state.artistDashboard.artistProfile;
export const selectRecentActivities = (state: RootState) => state.artistDashboard.recentActivities;
export const selectNotifications = (state: RootState) => state.artistDashboard.notifications;
export const selectDashboardLoading = (state: RootState) => state.artistDashboard.loading;
export const selectDashboardError = (state: RootState) => state.artistDashboard.error;

export default artistDashboardSlice.reducer;
