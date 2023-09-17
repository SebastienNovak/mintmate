import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Types
type AccessibilitySettingsState = {
    fontSize: 'small' | 'medium' | 'large';
    highContrast: boolean;
    screenReaderOptimized: boolean;
};

// Initial State
const initialState: AccessibilitySettingsState = {
    fontSize: 'medium',
    highContrast: false,
    screenReaderOptimized: false
};

// Slice
const accessibilitySettingsSlice = createSlice({
    name: 'accessibilitySettings',
    initialState,
    reducers: {
        setFontSize: (state, action: PayloadAction<'small' | 'medium' | 'large'>) => {
            state.fontSize = action.payload;
        },
        toggleHighContrast: (state) => {
            state.highContrast = !state.highContrast;
        },
        toggleScreenReaderOptimization: (state) => {
            state.screenReaderOptimized = !state.screenReaderOptimized;
        },
        resetAccessibilitySettings: () => {
            return initialState;
        }
    }
});

export const {
    setFontSize,
    toggleHighContrast,
    toggleScreenReaderOptimization,
    resetAccessibilitySettings
} = accessibilitySettingsSlice.actions;

// Selectors
type RootState = {
    accessibilitySettings: AccessibilitySettingsState;
};

export const selectFontSize = (state: RootState) => state.accessibilitySettings.fontSize;
export const selectHighContrast = (state: RootState) => state.accessibilitySettings.highContrast;
export const selectScreenReaderOptimization = (state: RootState) => state.accessibilitySettings.screenReaderOptimized;

export default accessibilitySettingsSlice.reducer;
