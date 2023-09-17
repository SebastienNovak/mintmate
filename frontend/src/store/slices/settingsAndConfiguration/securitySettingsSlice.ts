import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Types
type SecuritySettingsState = {
    twoFactorAuthenticationEnabled: boolean;
    emailAlerts: boolean;
    recentActivity: { activity: string, date: string }[]; // this could be more structured based on requirements
    activeSessions: number;
};

// Initial State
const initialState: SecuritySettingsState = {
    twoFactorAuthenticationEnabled: false,
    emailAlerts: true,
    recentActivity: [],
    activeSessions: 1
};

// Slice
const securitySettingsSlice = createSlice({
    name: 'securitySettings',
    initialState,
    reducers: {
        toggleTwoFactorAuthentication: (state) => {
            state.twoFactorAuthenticationEnabled = !state.twoFactorAuthenticationEnabled;
        },
        toggleEmailAlerts: (state) => {
            state.emailAlerts = !state.emailAlerts;
        },
        addRecentActivity: (state, action: PayloadAction<{ activity: string, date: string }>) => {
            state.recentActivity.push(action.payload);
        },
        setActiveSessions: (state, action: PayloadAction<number>) => {
            state.activeSessions = action.payload;
        },
        incrementActiveSessions: (state) => {
            state.activeSessions += 1;
        },
        decrementActiveSessions: (state) => {
            state.activeSessions -= 1;
        },
        resetSecuritySettings: () => {
            return initialState;
        }
    }
});

export const {
    toggleTwoFactorAuthentication,
    toggleEmailAlerts,
    addRecentActivity,
    setActiveSessions,
    incrementActiveSessions,
    decrementActiveSessions,
    resetSecuritySettings
} = securitySettingsSlice.actions;

// Selectors
type RootState = {
    securitySettings: SecuritySettingsState;
};

export const selectTwoFactorAuthentication = (state: RootState) => state.securitySettings.twoFactorAuthenticationEnabled;
export const selectEmailAlerts = (state: RootState) => state.securitySettings.emailAlerts;
export const selectRecentActivity = (state: RootState) => state.securitySettings.recentActivity;
export const selectActiveSessions = (state: RootState) => state.securitySettings.activeSessions;

export default securitySettingsSlice.reducer;
