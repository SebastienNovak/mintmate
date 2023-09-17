import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Types
type UserSettingsState = {
    theme: 'light' | 'dark';
    language: 'en' | 'fr' | 'es' | 'de'; // you can extend this list
    notificationsEnabled: boolean;
    profileVisibility: 'public' | 'private';
};

// Initial State
const initialState: UserSettingsState = {
    theme: 'light',
    language: 'en',
    notificationsEnabled: true,
    profileVisibility: 'public'
};

// Slice
const userSettingsSlice = createSlice({
    name: 'userSettings',
    initialState,
    reducers: {
        setTheme: (state, action: PayloadAction<'light' | 'dark'>) => {
            state.theme = action.payload;
        },
        setLanguage: (state, action: PayloadAction<'en' | 'fr' | 'es' | 'de'>) => {
            state.language = action.payload;
        },
        toggleNotifications: (state) => {
            state.notificationsEnabled = !state.notificationsEnabled;
        },
        setProfileVisibility: (state, action: PayloadAction<'public' | 'private'>) => {
            state.profileVisibility = action.payload;
        },
        resetUserSettings: () => {
            return initialState;
        }
    }
});

export const {
    setTheme,
    setLanguage,
    toggleNotifications,
    setProfileVisibility,
    resetUserSettings
} = userSettingsSlice.actions;

// Selectors
type RootState = {
    userSettings: UserSettingsState;
};

export const selectTheme = (state: RootState) => state.userSettings.theme;
export const selectLanguage = (state: RootState) => state.userSettings.language;
export const selectNotificationsStatus = (state: RootState) => state.userSettings.notificationsEnabled;
export const selectProfileVisibility = (state: RootState) => state.userSettings.profileVisibility;

export default userSettingsSlice.reducer;
