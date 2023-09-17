import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Define the Event type:
type VirtualEvent = {
    id: string;
    title: string;
    startTime: string;  // ISO format date-time string
    endTime: string;    // ISO format date-time string
    liveStreamLink: string;
    attendees: string[];  // List of user IDs or usernames attending the event
    chatMessages: { author: string, message: string, timestamp: string }[];  // Messages from the event's chat
};

type VirtualVenueState = {
    currentEvent: VirtualEvent | null;
    upcomingEvents: VirtualEvent[];
    pastEvents: VirtualEvent[];
    loading: boolean;
    error: string | null;
};

const initialState: VirtualVenueState = {
    currentEvent: null,
    upcomingEvents: [],
    pastEvents: [],
    loading: false,
    error: null,
};

const virtualVenueSlice = createSlice({
    name: 'virtualVenue',
    initialState,
    reducers: {
        fetchVenueEventsStart: (state) => {
            state.loading = true;
            state.error = null;
        },
        fetchVenueEventsSuccess: (state, action: PayloadAction<{ upcoming: VirtualEvent[], past: VirtualEvent[] }>) => {
            state.upcomingEvents = action.payload.upcoming;
            state.pastEvents = action.payload.past;
            state.loading = false;
        },
        fetchVenueEventsFailure: (state, action: PayloadAction<string>) => {
            state.loading = false;
            state.error = action.payload;
        },
        enterEvent: (state, action: PayloadAction<string>) => {
            // Find and set the current event based on event ID
            state.currentEvent = state.upcomingEvents.find(event => event.id === action.payload) || null;
        },
        exitEvent: (state) => {
            state.currentEvent = null;
        },
        addChatMessage: (state, action: PayloadAction<{ author: string, message: string, timestamp: string }>) => {
            state.currentEvent?.chatMessages.push(action.payload);
        },
        // ... other actions as needed
    }
});

export const {
    fetchVenueEventsStart,
    fetchVenueEventsSuccess,
    fetchVenueEventsFailure,
    enterEvent,
    exitEvent,
    addChatMessage
} = virtualVenueSlice.actions;

// Selectors
type RootState = {
    virtualVenue: VirtualVenueState;
};

export const selectCurrentEvent = (state: RootState) => state.virtualVenue.currentEvent;
export const selectUpcomingEvents = (state: RootState) => state.virtualVenue.upcomingEvents;
export const selectPastEvents = (state: RootState) => state.virtualVenue.pastEvents;
export const selectVenueLoading = (state: RootState) => state.virtualVenue.loading;
export const selectVenueError = (state: RootState) => state.virtualVenue.error;

export default virtualVenueSlice.reducer;
