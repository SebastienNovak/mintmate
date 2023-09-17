import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type Language = 'en' | 'es' | 'fr' | 'de'; // English, Spanish, French, German (extend as needed)

type LanguageSwitcherState = {
    currentLanguage: Language;
};

const initialState: LanguageSwitcherState = {
    currentLanguage: 'en',  // default to English
};

const languageSwitcherSlice = createSlice({
    name: 'languageSwitcher',
    initialState,
    reducers: {
        switchLanguage: (state, action: PayloadAction<Language>) => {
            state.currentLanguage = action.payload;
        },
    }
});

export const {
    switchLanguage
} = languageSwitcherSlice.actions;

// Selectors
type RootState = {
    languageSwitcher: LanguageSwitcherState;
};

export const selectCurrentLanguage = (state: RootState) => state.languageSwitcher.currentLanguage;

export default languageSwitcherSlice.reducer;
