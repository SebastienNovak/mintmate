import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Define types
type Option = {
    id: string;
    text: string;
    voteCount: number;
};

type VotingState = {
    options: Option[];
    userVote: string | null; // ID of the option the user voted for
    loading: boolean;
    error: string | null;
};

const initialState: VotingState = {
    options: [],
    userVote: null,
    loading: false,
    error: null
};

const votingSlice = createSlice({
    name: 'voting',
    initialState,
    reducers: {
        setOptions: (state, action: PayloadAction<Option[]>) => {
            state.options = action.payload;
        },
        voteForOption: (state, action: PayloadAction<string>) => {
            const option = state.options.find(opt => opt.id === action.payload);
            if (option) {
                option.voteCount += 1;
                state.userVote = action.payload;
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
    setOptions,
    voteForOption,
    setLoading,
    setError
} = votingSlice.actions;

// Selectors
type RootState = {
    voting: VotingState;
};

export const selectOptions = (state: RootState) => state.voting.options;
export const selectUserVote = (state: RootState) => state.voting.userVote;
export const selectLoadingStatus = (state: RootState) => state.voting.loading;
export const selectError = (state: RootState) => state.voting.error;

export default votingSlice.reducer;
