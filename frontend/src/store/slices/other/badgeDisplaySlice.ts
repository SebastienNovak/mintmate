import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Types
type Badge = {
    id: string;         // Unique identifier for the badge
    name: string;       // Name of the badge
    description: string;// Description or reason for the badge
    imageUrl: string;   // URL to the badge image/icon
};

type BadgeDisplayState = {
    badges: Badge[];       // List of user's badges
    status: 'idle' | 'loading' | 'succeeded' | 'failed';   // Status of fetching badges
    error: string | null;  // Any errors that might occur when fetching badges
};

// Initial State
const initialState: BadgeDisplayState = {
    badges: [],
    status: 'idle',
    error: null
};

// Slice
const badgeDisplaySlice = createSlice({
    name: 'badgeDisplay',
    initialState,
    reducers: {
        fetchBadgesStart: (state) => {
            state.status = 'loading';
        },
        fetchBadgesSuccess: (state, action: PayloadAction<Badge[]>) => {
            state.badges = action.payload;
            state.status = 'succeeded';
        },
        fetchBadgesFailure: (state, action: PayloadAction<string>) => {
            state.status = 'failed';
            state.error = action.payload;
        },
        addBadge: (state, action: PayloadAction<Badge>) => {
            state.badges.push(action.payload);
        },
        removeBadge: (state, action: PayloadAction<string>) => {
            state.badges = state.badges.filter(badge => badge.id !== action.payload);
        }
    }
});

export const {
    fetchBadgesStart,
    fetchBadgesSuccess,
    fetchBadgesFailure,
    addBadge,
    removeBadge
} = badgeDisplaySlice.actions;

// Selectors
type RootState = {
    badgeDisplay: BadgeDisplayState;
};

export const selectAllBadges = (state: RootState) => state.badgeDisplay.badges;
export const selectBadgeStatus = (state: RootState) => state.badgeDisplay.status;
export const selectBadgeError = (state: RootState) => state.badgeDisplay.error;

export default badgeDisplaySlice.reducer;
