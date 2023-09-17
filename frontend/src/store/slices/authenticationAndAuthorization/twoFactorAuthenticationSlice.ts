import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type TwoFactorAuthenticationState = {
    isEnabled: boolean | null;  // null means not checked yet, true means 2FA is enabled, false means 2FA is not enabled
    loading: boolean;  // Represents the loading state during 2FA operations
    error: string | null;  // Captures any error messages
    qrCodeURL: string | null;  // The QR code URL for setting up 2FA in a 2FA app
    verificationPassed: boolean; // Indicates if the user's 2FA verification was successful
};

const initialState: TwoFactorAuthenticationState = {
    isEnabled: null,
    loading: false,
    error: null,
    qrCodeURL: null,
    verificationPassed: false
};

const twoFactorAuthenticationSlice = createSlice({
    name: 'twoFactorAuthentication',
    initialState,
    reducers: {
        enable2FAStart: (state) => {
            state.loading = true;
            state.error = null;
        },
        enable2FASuccess: (state, action: PayloadAction<string>) => {
            state.loading = false;
            state.isEnabled = true;
            state.qrCodeURL = action.payload;
        },
        enable2FAFailure: (state, action: PayloadAction<string>) => {
            state.loading = false;
            state.error = action.payload;
        },
        verify2FAStart: (state) => {
            state.loading = true;
            state.error = null;
        },
        verify2FASuccess: (state) => {
            state.verificationPassed = true;
            state.loading = false;
        },
        verify2FAFailure: (state, action: PayloadAction<string>) => {
            state.verificationPassed = false;
            state.loading = false;
            state.error = action.payload;
        },
        disable2FAStart: (state) => {
            state.loading = true;
            state.error = null;
        },
        disable2FASuccess: (state) => {
            state.isEnabled = false;
            state.loading = false;
        },
        disable2FAFailure: (state, action: PayloadAction<string>) => {
            state.loading = false;
            state.error = action.payload;
        },
        reset2FAState: (state) => {
            Object.assign(state, initialState);
        },
    }
});

export const {
    enable2FAStart,
    enable2FASuccess,
    enable2FAFailure,
    verify2FAStart,
    verify2FASuccess,
    verify2FAFailure,
    disable2FAStart,
    disable2FASuccess,
    disable2FAFailure,
    reset2FAState
} = twoFactorAuthenticationSlice.actions;

// Selectors
type RootState = {
    twoFactorAuthentication: TwoFactorAuthenticationState;
};

export const selectIs2FAEnabled = (state: RootState) => state.twoFactorAuthentication.isEnabled;
export const selectLoading2FA = (state: RootState) => state.twoFactorAuthentication.loading;
export const selectError2FA = (state: RootState) => state.twoFactorAuthentication.error;
export const selectQRCodeURL = (state: RootState) => state.twoFactorAuthentication.qrCodeURL;
export const selectVerificationPassed = (state: RootState) => state.twoFactorAuthentication.verificationPassed;

export default twoFactorAuthenticationSlice.reducer;
