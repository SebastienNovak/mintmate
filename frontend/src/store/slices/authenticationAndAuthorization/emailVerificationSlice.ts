import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type EmailVerificationState = {
    isVerificationCodeSent: boolean;
    isVerificationCodeValid: boolean | null;  // null means not checked yet, true means valid, false means invalid
    loading: boolean;
    error: string | null;
};

const initialState: EmailVerificationState = {
    isVerificationCodeSent: false,
    isVerificationCodeValid: null,
    loading: false,
    error: null,
};

const emailVerificationSlice = createSlice({
    name: 'emailVerification',
    initialState,
    reducers: {
        sendVerificationCodeStart: (state) => {
            state.loading = true;
            state.error = null;
        },
        sendVerificationCodeSuccess: (state) => {
            state.isVerificationCodeSent = true;
            state.loading = false;
        },
        sendVerificationCodeFailure: (state, action: PayloadAction<string>) => {
            state.loading = false;
            state.error = action.payload;
        },
        verifyCodeStart: (state) => {
            state.loading = true;
            state.error = null;
        },
        verifyCodeSuccess: (state) => {
            state.isVerificationCodeValid = true;
            state.loading = false;
        },
        verifyCodeFailure: (state, action: PayloadAction<string>) => {
            state.isVerificationCodeValid = false;
            state.loading = false;
            state.error = action.payload;
        },
        resetEmailVerification: (state) => {
            state.isVerificationCodeSent = initialState.isVerificationCodeSent;
            state.isVerificationCodeValid = initialState.isVerificationCodeValid;
            state.loading = initialState.loading;
            state.error = initialState.error;
        },
    }
});

export const {
    sendVerificationCodeStart,
    sendVerificationCodeSuccess,
    sendVerificationCodeFailure,
    verifyCodeStart,
    verifyCodeSuccess,
    verifyCodeFailure,
    resetEmailVerification
} = emailVerificationSlice.actions;

// Selectors
type RootState = {
    emailVerification: EmailVerificationState;
};

export const selectIsVerificationCodeSent = (state: RootState) => state.emailVerification.isVerificationCodeSent;
export const selectIsVerificationCodeValid = (state: RootState) => state.emailVerification.isVerificationCodeValid;
export const selectLoading = (state: RootState) => state.emailVerification.loading;
export const selectError = (state: RootState) => state.emailVerification.error;

export default emailVerificationSlice.reducer;
