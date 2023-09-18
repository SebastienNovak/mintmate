import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Define types
export type UserScore = {
    userId: string;
    username: string;
    score: number;
    rank?: number; // Optional, can be computed based on score
    avatarUrl?: string; 
};

type LeaderboardState = {
    leaderboard: UserScore[];
    loading: boolean;
    error: string | null;
};

const initialState: LeaderboardState = {
    leaderboard: [],
    loading: false,
    error: null
};

const leaderboardSlice = createSlice({
    name: 'leaderboard',
    initialState,
    reducers: {
        setLeaderboard: (state, action: PayloadAction<UserScore[]>) => {
            state.leaderboard = action.payload;

            // Optionally, sort by score and set rank for each user
            state.leaderboard.sort((a, b) => b.score - a.score);
            state.leaderboard.forEach((userScore, index) => {
                userScore.rank = index + 1;
            });
        },
        updateUserScore: (state, action: PayloadAction<UserScore>) => {
            const index = state.leaderboard.findIndex(user => user.userId === action.payload.userId);
            if (index !== -1) {
                state.leaderboard[index] = action.payload;
            } else {
                state.leaderboard.push(action.payload);
            }
        },
        setLoading: (state, action: PayloadAction<boolean>) => {
            state.loading = action.payload;
        },
        setError: (state, action: PayloadAction<string>) => {
            state.error = action.payload;
        }
    }
});

export const {
    setLeaderboard,
    updateUserScore,
    setLoading,
    setError
} = leaderboardSlice.actions;

// Selectors
type RootState = {
    leaderboard: LeaderboardState;
};

export const selectLeaderboard = (state: RootState) => state.leaderboard.leaderboard;
export const selectLoadingStatus = (state: RootState) => state.leaderboard.loading;
export const selectError = (state: RootState) => state.leaderboard.error;
export const selectUserRank = (state: RootState, userId: string) => 
    state.leaderboard.leaderboard.find(userScore => userScore.userId === userId)?.rank;

export default leaderboardSlice.reducer;
