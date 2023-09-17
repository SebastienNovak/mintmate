import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Define the Workshop type:
type Workshop = {
    id: string;
    title: string;
    description: string;
    date: string;  // ISO format date-time string
    contentUrl: string;  // URL to workshop content (could be video, slides, etc.)
    assignments: { assignmentId: string, title: string, description: string }[];
    attendees: { userId: string, name: string, assignmentSubmission?: string, feedback?: string }[];
};

type WorkshopState = {
    currentWorkshop: Workshop | null;
    allWorkshops: Workshop[];
    loading: boolean;
    error: string | null;
};

const initialState: WorkshopState = {
    currentWorkshop: null,
    allWorkshops: [],
    loading: false,
    error: null,
};

const workshopSlice = createSlice({
    name: 'workshop',
    initialState,
    reducers: {
        fetchWorkshopsStart: (state) => {
            state.loading = true;
            state.error = null;
        },
        fetchWorkshopsSuccess: (state, action: PayloadAction<Workshop[]>) => {
            state.allWorkshops = action.payload;
            state.loading = false;
        },
        fetchWorkshopsFailure: (state, action: PayloadAction<string>) => {
            state.loading = false;
            state.error = action.payload;
        },
        enterWorkshop: (state, action: PayloadAction<string>) => {
            // Find and set the current workshop based on workshop ID
            state.currentWorkshop = state.allWorkshops.find(workshop => workshop.id === action.payload) || null;
        },
        submitAssignment: (state, action: PayloadAction<{ userId: string, assignmentId: string, submission: string }>) => {
            // Update the attendee's submission for the assignment in the current workshop
            const attendee = state.currentWorkshop?.attendees.find(a => a.userId === action.payload.userId);
            if (attendee) {
                attendee.assignmentSubmission = action.payload.submission;
            }
        },
        // ... other actions as needed
    }
});

export const {
    fetchWorkshopsStart,
    fetchWorkshopsSuccess,
    fetchWorkshopsFailure,
    enterWorkshop,
    submitAssignment
} = workshopSlice.actions;

// Selectors
type RootState = {
    workshop: WorkshopState;
};

export const selectCurrentWorkshop = (state: RootState) => state.workshop.currentWorkshop;
export const selectAllWorkshops = (state: RootState) => state.workshop.allWorkshops;
export const selectWorkshopLoading = (state: RootState) => state.workshop.loading;
export const selectWorkshopError = (state: RootState) => state.workshop.error;

export default workshopSlice.reducer;
