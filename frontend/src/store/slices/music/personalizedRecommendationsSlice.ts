import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Types

export type Song = {
    id: number;
    title: string;
    artist: string;
    duration: string;  // Format: "03:45"
    // ... other song details
};

type PersonalizedRecommendationsState = {
    recommendedSongs: Song[];
    loadingStatus: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
};

// Initial State

const initialState: PersonalizedRecommendationsState = {
    recommendedSongs: [],
    loadingStatus: 'idle',
    error: null
};

// Slice

const personalizedRecommendationsSlice = createSlice({
    name: 'personalizedRecommendations',
    initialState,
    reducers: {
        fetchRecommendedSongs: (state) => {
            state.loadingStatus = 'loading';
        },
        setRecommendedSongs: (state, action: PayloadAction<Song[]>) => {
            state.recommendedSongs = action.payload;
            state.loadingStatus = 'succeeded';
        },
        clearRecommendations: (state) => {
            state.recommendedSongs = [];
        },
        setError: (state, action: PayloadAction<string>) => {
            state.loadingStatus = 'failed';
            state.error = action.payload;
        }
    }
});

// Actions & Selectors

export const {
    fetchRecommendedSongs,
    setRecommendedSongs,
    clearRecommendations,
    setError
} = personalizedRecommendationsSlice.actions;

// Selectors
type RootState = {
    personalizedRecommendations: PersonalizedRecommendationsState;
};

export const selectRecommendedSongs = (state: RootState) => state.personalizedRecommendations.recommendedSongs;
export const selectLoadingStatus = (state: RootState) => state.personalizedRecommendations.loadingStatus;
export const selectError = (state: RootState) => state.personalizedRecommendations.error;

export default personalizedRecommendationsSlice.reducer;
