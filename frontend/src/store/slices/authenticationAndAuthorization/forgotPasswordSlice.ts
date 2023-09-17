import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type ForgotPasswordState = {
    isResetLinkSent: boolean;
    loading: boolean;
    error: string | null;
};

const initialState: ForgotPasswordState = {
    isResetLinkSent: false,
    loading: false,
    error: null,
};

const forgotPasswordSlice = createSlice({
    name: 'forgotPassword',
    initialState,
    reducers: {
        sendResetLinkStart: (state) => {
            state.loading = true;
            state.error = null;
        },
        sendResetLinkSuccess: (state) => {
            state.isResetLinkSent = true;
            state.loading = false;
        },
        sendResetLinkFailure: (state, action: PayloadAction<string>) => {
            state.loading = false;
            state.error = action.payload;
        },
        resetForgotPasswordState: (state) => {
            state.isResetLinkSent = initialState.isResetLinkSent;
            state.loading = initialState.loading;
            state.error = initialState.error;
        },
    }
});

export const {
    sendResetLinkStart,
    sendResetLinkSuccess,
    sendResetLinkFailure,
    resetForgotPasswordState
} = forgotPasswordSlice.actions;

// Selectors
type RootState = {
    forgotPassword: ForgotPasswordState;
};

export const selectIsResetLinkSent = (state: RootState) => state.forgotPassword.isResetLinkSent;
export const selectLoading = (state: RootState) => state.forgotPassword.loading;
export const selectError = (state: RootState) => state.forgotPassword.error;

export default forgotPasswordSlice.reducer;
