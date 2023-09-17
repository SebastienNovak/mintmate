import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type ArtistOnboardingState = {
    name: string;
    bio: string | null;
    portfolioLink: string | null;
    onboardingStep: 'start' | 'bio' | 'portfolio' | 'completed';
    status: 'idle' | 'processing' | 'completed' | 'error';
    errorMessage: string | null;
};

const initialState: ArtistOnboardingState = {
    name: '',
    bio: null,
    portfolioLink: null,
    onboardingStep: 'start',
    status: 'idle',
    errorMessage: null
};

const artistOnboardingSlice = createSlice({
    name: 'artistOnboarding',
    initialState,
    reducers: {
        startOnboarding: (state, action: PayloadAction<string>) => {
            state.name = action.payload;
            state.onboardingStep = 'bio';
        },
        setBio: (state, action: PayloadAction<string>) => {
            state.bio = action.payload;
            state.onboardingStep = 'portfolio';
        },
        setPortfolioLink: (state, action: PayloadAction<string>) => {
            state.portfolioLink = action.payload;
            state.onboardingStep = 'completed';
            state.status = 'completed';
        },
        onboardingFailed: (state, action: PayloadAction<string>) => {
            state.status = 'error';
            state.errorMessage = action.payload;
        }
    }
});

export const {
    startOnboarding,
    setBio,
    setPortfolioLink,
    onboardingFailed
} = artistOnboardingSlice.actions;

// Selectors
type RootState = {
    artistOnboarding: ArtistOnboardingState;
};

export const selectOnboardingStep = (state: RootState) => state.artistOnboarding.onboardingStep;
export const selectOnboardingStatus = (state: RootState) => state.artistOnboarding.status;

export default artistOnboardingSlice.reducer;
