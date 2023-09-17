import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Using previously defined Event type:

type Event = {
    id: string;
    title: string;
    description?: string;
    date: string; // Date in format YYYY-MM-DD
    time?: string; // Optional time for the event, format HH:mm
    location?: string; // Location of the event
    attendees?: string[]; // List of attendees' names or user IDs
    // ... other details you might need for a detailed view
};

type EventDetailState = {
    event: Event | null;
    loading: boolean;
    error: string | null;
};

const initialState: EventDetailState = {
    event: null,
    loading: false,
    error: null,
};

const eventDetailSlice = createSlice({
    name: 'eventDetail',
    initialState,
    reducers: {
        fetchEventDetailStart: (state) => {
            state.loading = true;
            state.error = null;
            state.event = null;
        },
        fetchEventDetailSuccess: (state, action: PayloadAction<Event>) => {
            state.event = action.payload;
            state.loading = false;
            state.error = null;
        },
        fetchEventDetailFailure: (state, action: PayloadAction<string>) => {
            state.loading = false;
            state.error = action.payload;
        },
        clearEventDetail: (state) => {
            state.event = null;
        }
    }
});

export const {
    fetchEventDetailStart,
    fetchEventDetailSuccess,
    fetchEventDetailFailure,
    clearEventDetail
} = eventDetailSlice.actions;

// Selectors
type RootState = {
    eventDetail: EventDetailState;
};

export const selectEventDetail = (state: RootState) => state.eventDetail.event;
export const selectDetailLoading = (state: RootState) => state.eventDetail.loading;
export const selectDetailError = (state: RootState) => state.eventDetail.error;

export default eventDetailSlice.reducer;
