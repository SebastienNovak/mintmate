import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Types:

export type TrendingContent = {
    id: string;
    title: string;
    author: string;
    timestamp: Date; // When the content was posted
    engagementScore: number; // Could be calculated based on likes, shares, views, etc.
    imageUrl?: string;
    link: string;
};

export type TrendingState = {
    trendingContents: TrendingContent[];
    loading: boolean;
    error: string | null;
};

const initialState: TrendingState = {
    trendingContents: [],
    loading: false,
    error: null,
};

const trendingSlice = createSlice({
    name: 'trending',
    initialState,
    reducers: {
        fetchTrendingStart: (state) => {
            state.loading = true;
            state.error = null;
        },
        fetchTrendingSuccess: (state, action: PayloadAction<TrendingContent[]>) => {
            state.trendingContents = action.payload;
            state.loading = false;
        },
        fetchTrendingFailure: (state, action: PayloadAction<string>) => {
            state.loading = false;
            state.error = action.payload;
        },
    }
});

export const {
    fetchTrendingStart,
    fetchTrendingSuccess,
    fetchTrendingFailure
} = trendingSlice.actions;

// Selectors
type RootState = {
    trending: TrendingState;
};

export const selectAllTrendingContent = (state: RootState) => state.trending.trendingContents;
export const selectTrendingContentById = (state: RootState, contentId: string) => state.trending.trendingContents.find(content => content.id === contentId);
export const selectLoading = (state: RootState) => state.trending.loading;
export const selectError = (state: RootState) => state.trending.error;

export default trendingSlice.reducer;
