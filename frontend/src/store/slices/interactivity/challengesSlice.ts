import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type Challenge = {
    id: string;
    title: string;
    description: string;
    reward: string;
    isCompleted: boolean;
    expiryDate?: Date; // Optional: if challenges have an expiration
};

type ChallengesState = {
    challenges: Challenge[];
    activeChallengeId: string | null; // ID of the challenge that a user is currently viewing or interacting with
};

const initialState: ChallengesState = {
    challenges: [],
    activeChallengeId: null
};

const challengesSlice = createSlice({
    name: 'challenges',
    initialState,
    reducers: {
        setChallenges: (state, action: PayloadAction<Challenge[]>) => {
            state.challenges = action.payload;
        },
        setActiveChallenge: (state, action: PayloadAction<string>) => {
            state.activeChallengeId = action.payload;
        },
        completeChallenge: (state, action: PayloadAction<string>) => {
            const challenge = state.challenges.find(ch => ch.id === action.payload);
            if (challenge) {
                challenge.isCompleted = true;
            }
        },
        resetChallenge: (state, action: PayloadAction<string>) => {
            const challenge = state.challenges.find(ch => ch.id === action.payload);
            if (challenge) {
                challenge.isCompleted = false;
            }
        }
    }
});

export const {
    setChallenges,
    setActiveChallenge,
    completeChallenge,
    resetChallenge
} = challengesSlice.actions;

// Selectors
type RootState = {
    challenges: ChallengesState;
};

export const selectAllChallenges = (state: RootState) => state.challenges.challenges;
export const selectActiveChallenge = (state: RootState) => 
    state.challenges.challenges.find(ch => ch.id === state.challenges.activeChallengeId);
export const selectCompletedChallenges = (state: RootState) => 
    state.challenges.challenges.filter(ch => ch.isCompleted);

export default challengesSlice.reducer;
