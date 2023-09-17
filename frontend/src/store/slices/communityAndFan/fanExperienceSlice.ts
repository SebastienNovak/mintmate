import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Types:

type Experience = {
    id: string;
    title: string;
    description: string;
    date: string;  // ISO date string
    availability: 'available' | 'unavailable' | 'ended';
    type: 'meet-and-greet' | 'exclusive-content' | 'merch-discount' | 'live-event';
    accessLevel: 'basic' | 'premium' | 'elite'; // Membership level required to access the experience
};

type FanExperienceState = {
    experiences: Experience[];
    loading: boolean;
    error: string | null;
};

const initialState: FanExperienceState = {
    experiences: [],
    loading: false,
    error: null,
};

const fanExperienceSlice = createSlice({
    name: 'fanExperience',
    initialState,
    reducers: {
        fetchExperiencesStart: (state) => {
            state.loading = true;
            state.error = null;
        },
        fetchExperiencesSuccess: (state, action: PayloadAction<Experience[]>) => {
            state.experiences = action.payload;
            state.loading = false;
        },
        fetchExperiencesFailure: (state, action: PayloadAction<string>) => {
            state.loading = false;
            state.error = action.payload;
        },
        updateExperienceAvailability: (state, action: PayloadAction<{ experienceId: string, availability: 'available' | 'unavailable' | 'ended' }>) => {
            const experience = state.experiences.find(exp => exp.id === action.payload.experienceId);
            if (experience) {
                experience.availability = action.payload.availability;
            }
        }
    }
});

export const {
    fetchExperiencesStart,
    fetchExperiencesSuccess,
    fetchExperiencesFailure,
    updateExperienceAvailability
} = fanExperienceSlice.actions;

// Selectors
type RootState = {
    fanExperience: FanExperienceState;
};

export const selectExperiences = (state: RootState) => state.fanExperience.experiences;
export const selectLoading = (state: RootState) => state.fanExperience.loading;
export const selectError = (state: RootState) => state.fanExperience.error;

export default fanExperienceSlice.reducer;
