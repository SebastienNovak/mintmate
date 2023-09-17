import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Types
type GlobalErrorState = {
    hasError: boolean;
    errorInfo: string | null;
};

// Initial State
const initialState: GlobalErrorState = {
    hasError: false,
    errorInfo: null
};

// Slice
const errorBoundarySlice = createSlice({
    name: 'errorBoundary',
    initialState,
    reducers: {
        setError: (state, action: PayloadAction<string>) => {
            state.hasError = true;
            state.errorInfo = action.payload;
        },
        clearError: (state) => {
            state.hasError = false;
            state.errorInfo = null;
        }
    }
});

export const {
    setError,
    clearError
} = errorBoundarySlice.actions;

// Selectors
type RootState = {
    errorBoundary: GlobalErrorState;
};

export const selectHasError = (state: RootState) => state.errorBoundary.hasError;
export const selectErrorInfo = (state: RootState) => state.errorBoundary.errorInfo;

export default errorBoundarySlice.reducer;
