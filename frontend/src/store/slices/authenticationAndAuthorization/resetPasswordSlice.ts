import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type ResetPasswordState = {
    isResetSuccessful: boolean;  // Indicates whether the password reset was successful
    loading: boolean;  // Represents the loading state during password reset
    error: string | null;  // Captures any error messages
    tokenValidated: boolean | null; // Indicates whether the reset token has been validated (null: not yet checked, true: valid, false: invalid)
};

const initialState: ResetPasswordState = {
    isResetSuccessful: false,
    loading: false,
    error: null,
    tokenValidated: null
};

const resetPasswordSlice = createSlice({
    name: 'resetPassword',
    initialState,
    reducers: {
        validateTokenStart: (state) => {
            state.loading = true;
            state.error = null;
        },
        validateTokenSuccess: (state) => {
            state.loading = false;
            state.tokenValidated = true;
        },
        validateTokenFailure: (state, action: PayloadAction<string>) => {
            state.loading = false;
            state.tokenValidated = false;
            state.error = action.payload;
        },
        resetPasswordStart: (state) => {
            state.loading = true;
            state.error = null;
        },
        resetPasswordSuccess: (state) => {
            state.isResetSuccessful = true;
            state.loading = false;
        },
        resetPasswordFailure: (state, action: PayloadAction<string>) => {
            state.loading = false;
            state.isResetSuccessful = false;
            state.error = action.payload;
        },
        resetResetPasswordState: (state) => {
            state.isResetSuccessful = initialState.isResetSuccessful;
            state.loading = initialState.loading;
            state.error = initialState.error;
            state.tokenValidated = initialState.tokenValidated;
        },
    }
});

export const {
    validateTokenStart,
    validateTokenSuccess,
    validateTokenFailure,
    resetPasswordStart,
    resetPasswordSuccess,
    resetPasswordFailure,
    resetResetPasswordState
} = resetPasswordSlice.actions;

// Selectors
type RootState = {
    resetPassword: ResetPasswordState;
};

export const selectIsResetSuccessful = (state: RootState) => state.resetPassword.isResetSuccessful;
export const selectLoading = (state: RootState) => state.resetPassword.loading;
export const selectError = (state: RootState) => state.resetPassword.error;
export const selectTokenValidated = (state: RootState) => state.resetPassword.tokenValidated;

export default resetPasswordSlice.reducer;
