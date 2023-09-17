import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Define types:

type Achievement = {
    id: string;
    title: string;
    description: string;
    imageUrl: string;
    unlockedAt: string; // ISO date string representing when this achievement was unlocked.
};

type AchievementsGalleryState = {
    achievements: Achievement[];
    loading: boolean;
    error: string | null;
};

const initialState: AchievementsGalleryState = {
    achievements: [],
    loading: false,
    error: null,
};

const achievementsGallerySlice = createSlice({
    name: 'achievementsGallery',
    initialState,
    reducers: {
        fetchAchievementsStart: (state) => {
            state.loading = true;
            state.error = null;
        },
        fetchAchievementsSuccess: (state, action: PayloadAction<Achievement[]>) => {
            state.achievements = action.payload;
            state.loading = false;
        },
        fetchAchievementsFailure: (state, action: PayloadAction<string>) => {
            state.loading = false;
            state.error = action.payload;
        },
        unlockAchievement: (state, action: PayloadAction<Achievement>) => {
            // Check if the achievement already exists to avoid duplicates
            if (!state.achievements.some(ach => ach.id === action.payload.id)) {
                state.achievements.push(action.payload);
            }
        }
    }
});

export const {
    fetchAchievementsStart,
    fetchAchievementsSuccess,
    fetchAchievementsFailure,
    unlockAchievement
} = achievementsGallerySlice.actions;

// Selectors
type RootState = {
    achievementsGallery: AchievementsGalleryState;
};

export const selectAchievements = (state: RootState) => state.achievementsGallery.achievements;
export const selectAchievementsLoading = (state: RootState) => state.achievementsGallery.loading;
export const selectAchievementsError = (state: RootState) => state.achievementsGallery.error;

export default achievementsGallerySlice.reducer;
