import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Types
type LoadingState = {
    isLoading: boolean;
    message?: string;  // Optional loading message to display
};

// Initial State
const initialState: LoadingState = {
    isLoading: false,
    message: undefined
};

// Slice
const loadingSpinnerSlice = createSlice({
    name: 'loadingSpinner',
    initialState,
    reducers: {
        startLoading: (state, action: PayloadAction<string | undefined>) => {
            state.isLoading = true;
            state.message = action.payload;
        },
        stopLoading: (state) => {
            state.isLoading = false;
            state.message = undefined;
        }
    }
});

export const {
    startLoading,
    stopLoading
} = loadingSpinnerSlice.actions;

// Selectors
type RootState = {
    loadingSpinner: LoadingState;
};

export const selectIsLoading = (state: RootState) => state.loadingSpinner.isLoading;
export const selectLoadingMessage = (state: RootState) => state.loadingSpinner.message;

export default loadingSpinnerSlice.reducer;
