import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type OnboardingStep = {
    id: number;
    title: string;
    completed: boolean;
};

type UserOnboardingState = {
    currentStep: number;
    steps: OnboardingStep[];
    loading: boolean;
    error: string | null;
};

const initialState: UserOnboardingState = {
    currentStep: 1,
    steps: [
        { id: 1, title: "Welcome", completed: false },
        { id: 2, title: "Profile Setup", completed: false },
        { id: 3, title: "Tutorial", completed: false },
        // ... add more steps as needed
    ],
    loading: false,
    error: null,
};

const userOnboardingSlice = createSlice({
    name: 'userOnboarding',
    initialState,
    reducers: {
        startOnboarding: (state) => {
            state.loading = true;
        },
        completeCurrentStep: (state) => {
            const currentStep = state.steps.find(step => step.id === state.currentStep);
            if (currentStep) {
                currentStep.completed = true;
            }
            state.currentStep += 1;
            state.loading = false;
        },
        skipStep: (state) => {
            state.currentStep += 1;
        },
        setOnboardingError: (state, action: PayloadAction<string>) => {
            state.error = action.payload;
            state.loading = false;
        },
        resetOnboarding: (state) => {
            Object.assign(state, initialState);
        },
    }
});

export const {
    startOnboarding,
    completeCurrentStep,
    skipStep,
    setOnboardingError,
    resetOnboarding
} = userOnboardingSlice.actions;

// Selectors
type RootState = {
    userOnboarding: UserOnboardingState;
};

export const selectCurrentStep = (state: RootState) => state.userOnboarding.currentStep;
export const selectOnboardingSteps = (state: RootState) => state.userOnboarding.steps;
export const selectOnboardingLoading = (state: RootState) => state.userOnboarding.loading;
export const selectOnboardingError = (state: RootState) => state.userOnboarding.error;

export default userOnboardingSlice.reducer;
